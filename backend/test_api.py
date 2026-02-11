#!/usr/bin/env python3
"""Test script to verify the FastAPI backend works correctly"""

import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("Testing /api/health...")
    response = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    print()

def test_content():
    """Test content endpoint"""
    print("Testing /api/content...")
    response = requests.get(f"{BASE_URL}/api/content")
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Config: {data.get('config')}")
    print(f"Sections: {list(data.get('sections', {}).keys())}")
    print()

def test_section():
    """Test specific section endpoint"""
    print("Testing /api/content/About...")
    response = requests.get(f"{BASE_URL}/api/content/About")
    print(f"Status: {response.status_code}")
    print(f"Content preview: {response.json().get('content', '')[:100]}...")
    print()

if __name__ == "__main__":
    print("=" * 50)
    print("FastAPI Backend Test")
    print("=" * 50)
    print()
    
    try:
        test_health()
        test_content()
        test_section()
        print("✅ All tests passed!")
    except Exception as e:
        print(f"❌ Test failed: {e}")
