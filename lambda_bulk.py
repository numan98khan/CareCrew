# python 3.10
# You'll need to give this lambda s3 readonly access

import json
import boto3
import csv
import requests

client = boto3.client('appsync', region_name='us-east-1')
s3 = boto3.client('s3')

API_URL = 'https://meyrpafnafextb6onlbw2lvxmu.appsync-api.us-east-1.amazonaws.com/graphql'
API_KEY = 'da2-rmxq6zqkxjgjdeemtwjmztm4vq'

headers = {
    'Content-Type': 'application/graphql',
    'x-api-key': API_KEY
}



def lambda_handler(event, context):
    # Assuming the event contains info like 'fileType' and S3 bucket/key info for the file
    if event['fileType'] == 'csv':
        file_content = download_from_s3(event['bucketName'], event['fileKey'])
        shifts = read_csv(file_content)
    else:  # Assume JSON
        shifts = json.loads(event['jsonContent'])

    # Create shifts in bulk
    for shift in shifts:
        create_shift(shift)
    return {
        'statusCode': 200,
        'body': json.dumps('Shifts created successfully!')
    }

def download_from_s3(bucket, key):
    # Download the file to Lambda's tmp directory
    tmp_path = '/tmp/tempfile.csv'
    s3.download_file(bucket, key, tmp_path)
    return tmp_path

def read_csv(file_path):
    shifts = []
    with open(file_path, mode='r') as file:
        reader = csv.reader(file)
        next(reader)  # skip header
        for row in reader:
            shift = {
                "numOfPositions": row[0],
                "facilityID": row[1],
                # ... Add all the other properties
            }
            shifts.append(shift)
    return shifts

# def create_shift(shift):
#     mutation = """
#   mutation CreateShifts(
#     $input: CreateShiftsInput!
#     $condition: ModelShiftsConditionInput
#   ) {
#     createShifts(input: $input, condition: $condition) {
#       id
#       numOfPositions
#       shiftStart
#       shiftEnd
#       date
#       roleRequired
#       rate
#       floorNumber
#       supervisor
#       incentives {
#         incentiveBy
#         incentiveType
#         incentiveAmount
#         notes
#         __typename
#       }
#       cancellationGuarantee
#       isAssigned
#       isIncentive
#       isGuarantee
#       isLate
#       isCallOff
#       isSelected
#       recurringSchedule
#       facilityID
#       Timecards {
#         items {
#           id
#           clockInTime
#           clockOutTime
#           isCallOff
#           peopleID
#           shiftsID
#           isLate
#           lateReason
#           date
#           createdAt
#           updatedAt
#           _version
#           _deleted
#           _lastChangedAt
#           __typename
#         }
#         nextToken
#         startedAt
#         __typename
#       }
#       createdAt
#       updatedAt
#       _version
#       _deleted
#       _lastChangedAt
#       __typename
#     }
#   }

#     """

#     response = client.graphql(
#         apiId='meyrpafnafextb6onlbw2lvxmu',
#         query=mutation,
#         variables={
#             "input": shift
#         },
#         headers=headers
#     )
#     return response


# # ...

def create_shift(shift):
    mutation = """
  mutation CreateShifts(
    $input: CreateShiftsInput!
    $condition: ModelShiftsConditionInput
  ) {
    createShifts(input: $input, condition: $condition) {
      id
      numOfPositions
      shiftStart
      shiftEnd
      date
      roleRequired
      rate
      floorNumber
      supervisor
      incentives {
        incentiveBy
        incentiveType
        incentiveAmount
        notes
        __typename
      }
      cancellationGuarantee
      isAssigned
      isIncentive
      isGuarantee
      isLate
      isCallOff
      isSelected
      recurringSchedule
      facilityID
      Timecards {
        items {
          id
          clockInTime
          clockOutTime
          isCallOff
          peopleID
          shiftsID
          isLate
          lateReason
          date
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          __typename
        }
        nextToken
        startedAt
        __typename
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }

    """
    
    headers = {
        'Content-Type': 'application/graphql',
        'x-api-key': API_KEY
    }
    
    data = {
        "query": mutation,
        "variables": {
            "input": shift
        }
    }
    
    response = requests.post(API_URL, headers=headers, data=json.dumps(data))
    
    return response.json()



# {
#   "fileType": "csv",
#   "bucketName": "my-bucket-name",
#   "fileKey": "path/to/myfile.csv"
# }

# {
#   "fileType": "csv",
#   "bucketName": "instacare-storage211042-staging",
#   "fileKey": "bulk shifts.csv"
# }

# {
#   "fileType": "json",
#   "jsonContent": "[{\"numOfPositions\": 5, \"facilityID\": \"abc123\"}, ...]"
# }

