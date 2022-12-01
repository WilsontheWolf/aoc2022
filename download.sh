#!/bin/bash

USAGE="USAGE:
To provide the token, either set the ENV varible AOC_TOKEN or make a file called token and put it in there.
$0 <day>\n"

YEAR=2022

if [[ -z "$AOC_TOKEN" ]] then
    _TOKEN=$(cat token);
else 
    _TOKEN=$AOC_TOKEN
fi

if [[ -z "$_TOKEN" ]] then
    echo The token was not found!
    printf "$USAGE"
    exit 1
fi

DAY=$1

if [[ -z "$DAY" ]] then
    echo No day was provided!
    printf "$USAGE"
    exit 1
fi

if [[ $DAY -lt 1 || $DAY -gt 25 ]] then
    echo Day must be between 1 and 25!
    printf "$USAGE"
    exit 1
fi

mkdir -p inputs

if [[ -f "inputs/$DAY.txt" ]] then
    echo "Input file already exists. Skipping."
else
    echo "Downloading input..."
    INPUT=$(curl -s -H "Cookie: session=$_TOKEN" --fail-with-body https://adventofcode.com/$YEAR/day/$DAY/input)
    if [[ $? -ne 0 ]] then
        echo "Failed to download input!"
        echo $INPUT
        exit 1
    fi
    echo "$INPUT" > inputs/$DAY.txt
    echo "Input successfully downloaded to ./inputs/$DAY.txt"
fi