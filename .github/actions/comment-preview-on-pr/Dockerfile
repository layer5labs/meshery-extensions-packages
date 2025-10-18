FROM python:3.11-slim

RUN pip install --no-cache-dir httpx "pydantic==1.10.15" pygithub

COPY ./app /app

CMD ["python", "/app/main.py"]
