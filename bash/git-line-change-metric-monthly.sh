#!/bin/bash

YEAR=2024
START_MONTH=1
END_MONTH=9
FILE_NAME="monthly-line-change-metric.csv"

MONTHS=("January" "February" "March" "April" "May" "June" "July" "August" "September" "October" "November" "December")

echo "Month,Insertions,Deletions,Net Change" > $FILE_NAME
while [ $START_MONTH -le $END_MONTH ]; do
    git log --stat --since="2024-$START_MONTH-01" --until="2024-$START_MONTH-31" | grep -E "file[s]? changed" | awk -v month="${MONTHS[$START_MONTH-1]}" '
        {
            insertions += $4
            deletions += $6
        }
        END {
            print month, insertions, deletions, insertions-deletions
        }' >> $FILE_NAME
    START_MONTH=$((START_MONTH+1))
done
