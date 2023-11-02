#! /bin/bash

mkdir secrets 2> /dev/null

envsubst < secretsTemplate.json > secrets/cred.json