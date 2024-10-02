{
	"info": {
		"_postman_id": "d4fd8f0e-3fc3-4424-8a8f-f9824f922e6f",
		"name": "mobigik-backend",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "sign-up",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\":\"kaushalpatel089@gmail.com\",\n    \"password\":\"Kaushal@123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/users/signup",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"users",
						"signup"
					]
				}
			},
			"response": []
		},
		{
			"name": "login",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\n    \"username\":\"kaushalpatel089@gmail.com\",\n    \"password\":\"Kaushal@123\"\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:5000/users/login",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"users",
						"login"
					]
				}
			},
			"response": []
		},
		{
			"name": "create-media",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NmZkNGRmN2UyZDI4NmM2NTMwOWQxZTgiLCJ1c2VybmFtZSI6ImthdXNoYWxwYXRlbDA4OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKeEtuMllxTEFnVFUuRHBFczZZaTMud252Y2ZEMC9qNE1sTlJOeW83aUszWU91TzJtNVhuNiIsIl9fdiI6MH0.1cPRxCyj2_7Hv1QgA8Humz1PgXGlrlHDrQ-SmBqQr6o",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "media",
							"type": "file",
							"src": "/home/kaushal/Downloads/wd-gann-rules.jpeg"
						}
					]
				},
				"url": {
					"raw": "http://localhost:5000/media/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"media",
						""
					]
				}
			},
			"response": []
		},
		{
			"name": "delete-media",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2NmZkNGRmN2UyZDI4NmM2NTMwOWQxZTgiLCJ1c2VybmFtZSI6ImthdXNoYWxwYXRlbDA4OUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRKeEtuMllxTEFnVFUuRHBFczZZaTMud252Y2ZEMC9qNE1sTlJOeW83aUszWU91TzJtNVhuNiIsIl9fdiI6MH0.1cPRxCyj2_7Hv1QgA8Humz1PgXGlrlHDrQ-SmBqQr6o",
							"type": "string"
						}
					]
				},
				"method": "DELETE",
				"header": [],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "media",
							"type": "file",
							"src": "/home/kaushal/Downloads/wd-gann-rules.jpeg",
							"disabled": true
						}
					]
				},
				"url": {
					"raw": "http://localhost:5000/media/66fd62779bba38565629e2f5",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "5000",
					"path": [
						"media",
						"66fd62779bba38565629e2f5"
					]
				}
			},
			"response": []
		},
		{
			"name": "get-media",
			"request": {
				"method": "GET",
				"header": []
			},
			"response": []
		}
	]
}