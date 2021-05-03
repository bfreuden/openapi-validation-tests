#!/bin/sh
pip install -r requirements.txt
uvicorn main:app --port 8081 --reload
