# Deploy

We are using Google cloud run to deploy this bot. We are also using Github actions. In order to create the Dockerfile and the Github action script we followed this [blog post](https://cloud.google.com/community/tutorials/cicd-cloud-run-github-actions).

## Setup service account

```
gcloud iam service-accounts create bngo-ci \
  --description="Cloud Run deploy account for bngo" \
  --display-name="bngo-Cloud-Run-Deploy"

gcloud projects add-iam-policy-binding brikev \
  --member=serviceAccount:bngo-ci@brikev.iam.gserviceaccount.com \
  --role=roles/run.admin

gcloud projects add-iam-policy-binding brikev \
  --member=serviceAccount:bngo-ci@brikev.iam.gserviceaccount.com \
  --role=roles/storage.admin

gcloud iam service-accounts keys create key.json \
    --iam-account bngo-ci@brikev.iam.gserviceaccount.com
```
