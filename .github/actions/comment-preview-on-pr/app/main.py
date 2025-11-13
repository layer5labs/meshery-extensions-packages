import json
import logging
import sys
from pathlib import Path
from typing import Optional

import httpx
from github import Github
from github.PullRequest import PullRequest
from pydantic import BaseModel, BaseSettings, SecretStr, ValidationError

GITHUB_API = "https://api.github.com"


class Settings(BaseSettings):
    github_repository: str
    github_event_path: Path
    github_event_name: Optional[str] = None
    input_token: SecretStr
    input_deploy_url: str


class PartialGithubEventHeadCommit(BaseModel):
    id: str


class PartialGithubEventWorkflowRun(BaseModel):
    head_commit: PartialGithubEventHeadCommit
    conclusion: Optional[str] = None


class PartialGithubEvent(BaseModel):
    workflow_run: PartialGithubEventWorkflowRun


def log_event_preview(event_path: Path) -> None:
    try:
        payload = json.loads(event_path.read_text())
    except Exception as exc:  # pragma: no cover - diagnostic only
        logging.debug("Unable to decode event payload: %s", exc)
        return
    logging.debug("Workflow run payload preview: %s", json.dumps(payload, indent=2)[:512])


def find_pr_for_commit(repo, commit_sha: str) -> Optional[PullRequest]:
    for pr in repo.get_pulls(state="open"):
        if pr.head.sha == commit_sha:
            return pr
    return None


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    settings = Settings()
    logging.info("Commenting preview for repository %s", settings.github_repository)
    log_event_preview(settings.github_event_path)

    try:
        event = PartialGithubEvent.parse_file(settings.github_event_path)
    except ValidationError as exc:
        logging.error("Unable to parse workflow_run payload: %s", exc)
        sys.exit(0)

    if event.workflow_run.conclusion and event.workflow_run.conclusion != "success":
        logging.info(
            "Skipping comment because workflow conclusion was %s",
            event.workflow_run.conclusion,
        )
        sys.exit(0)

    commit_id = event.workflow_run.head_commit.id
    github_client = Github(settings.input_token.get_secret_value())
    repository = github_client.get_repo(settings.github_repository)
    pull_request = find_pr_for_commit(repository, commit_id)

    if not pull_request:
        logging.error("No open pull request found for commit %s", commit_id)
        sys.exit(0)

    logging.info("Posting preview comment to PR #%s", pull_request.number)
    headers = {"Authorization": f"token {settings.input_token.get_secret_value()}"}
    response = httpx.post(
        f"{GITHUB_API}/repos/{settings.github_repository}/issues/{pull_request.number}/comments",
        headers=headers,
        json={"body": f"🚀 Preview for commit {pull_request.head.sha}: {settings.input_deploy_url}"},
        timeout=30.0,
    )

    if not response.is_success:
        logging.error("Failed to post preview comment: %s", response.text)
        sys.exit(1)

    logging.info("Preview comment successfully posted")
