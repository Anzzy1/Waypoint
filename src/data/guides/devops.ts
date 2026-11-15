import type { LessonGuide } from './types';

/** DevOps + cloud lessons. */
export const DEVOPS_GUIDES: Record<string, LessonGuide> = {
  linux: {
    simple: "Linux is the operating system that runs most servers on the internet. Knowing it means you can set up and fix the computers your apps live on.",
    uses: ["Manage servers in the cloud", "Fix production problems over SSH", "Understand how Docker and Kubernetes work underneath"],
    example: {
      file: "Terminal",
      code: `ssh deploy@203.0.113.10
sudo apt update && sudo apt install -y nginx
sudo systemctl status nginx
ls -l /var/www`,
      output: `● nginx.service - A high performance web server
     Active: active (running)
drwxr-xr-x 3 root root 4096 Nov 14 09:12 html`,
      note: "Log in to a remote server, install a web server, check that it’s running, and look at file permissions.",
    },
    steps: [
      { t: "Files and permissions", d: "Everything lives under / (/etc for config, /var for logs and data, /home for users). Permissions (rwx) control who can read, write and run each file.", try: "Run ls -l and explain what drwxr-xr-x means. Change a file’s permissions with chmod." },
      { t: "Processes and services", d: "ps and top show running programs. Signals stop them (kill). systemd starts services at boot and restarts them if they crash.", try: "Find the process using the most CPU with top, then check a service with systemctl status." },
      { t: "Installing software", d: "apt (Ubuntu/Debian) and dnf (Fedora/RHEL) install and update software from trusted repositories.", try: "Install and remove a small package like htop." },
      { t: "SSH and remote servers", d: "SSH logs you into another machine securely. Use key pairs instead of passwords.", try: "Generate an SSH key with ssh-keygen and add it to your GitHub account." },
    ],
    project: "Rent a $5 server (or use a free tier), set up SSH keys, install Nginx and serve your portfolio from it.",
  },

  networking: {
    simple: "Networking is how computers find and talk to each other: addresses, routes, names and the rules for sending data.",
    uses: ["Debug “it can’t connect” problems", "Set up cloud networks and firewalls", "Configure domains and email"],
    example: {
      file: "Terminal",
      code: `dig example.com A +short
dig example.com MX +short
nc -zv example.com 443`,
      output: `93.184.215.14
0 .
Connection to example.com port 443 [tcp/https] succeeded!`,
      note: "Look up a domain’s IP address and mail servers, then test whether port 443 (HTTPS) is reachable.",
    },
    steps: [
      { t: "Network layers", d: "The OSI and TCP/IP models split networking into layers: physical cables, IP addresses, TCP/UDP transport, and apps like HTTP. Problems usually sit in one layer.", try: "Match each of these to a layer: Wi-Fi, IP address, TCP, HTTP." },
      { t: "IP addresses and subnets", d: "An IP identifies a device. CIDR like 10.0.0.0/24 describes a range of addresses (here 256). Private ranges are used inside networks.", try: "Use a CIDR calculator to find how many addresses are in /16, /24 and /28." },
      { t: "DNS records", d: "A points a name to an IP, CNAME points a name to another name, MX handles email, TXT proves ownership.", try: "Look up the A, MX and TXT records of a big company’s domain with dig or nslookup." },
      { t: "TCP, UDP, ports and TLS", d: "TCP is reliable and ordered (web, email). UDP is fast and lossy (video calls, games). Ports identify the service. TLS encrypts the connection.", try: "List which ports SSH, HTTP, HTTPS and PostgreSQL use by default." },
    ],
    project: "Draw your home network (router, devices, IPs) and explain step by step how your laptop reaches google.com.",
  },

  scripting: {
    simple: "Shell scripting means writing small programs that run terminal commands for you, so repetitive tasks happen automatically.",
    uses: ["Automate backups, deploys and cleanups", "Process log files in seconds", "Glue tools together in CI pipelines"],
    example: {
      file: "backup.sh",
      code: `#!/usr/bin/env bash
set -euo pipefail

SRC="$HOME/projects"
DEST="$HOME/backups/projects-$(date +%F).tar.gz"

tar -czf "$DEST" "$SRC"
echo "Backed up to $DEST"`,
      output: `Backed up to /home/sam/backups/projects-2026-11-14.tar.gz`,
      note: "Compress your projects folder into a dated backup file. set -euo pipefail stops the script at the first error.",
    },
    steps: [
      { t: "Variables, loops and conditions", d: "Bash scripts use variables (NAME=\"x\"), if statements and for loops, just like other languages, with slightly odd syntax.", try: "Write a script that loops over all .txt files in a folder and prints their line counts." },
      { t: "Exit codes and safety", d: "Every command returns 0 for success or a number for failure. set -euo pipefail makes scripts stop on errors instead of carrying on broken.", try: "Run a failing command, then echo $? to see its exit code." },
      { t: "Text processing", d: "grep finds lines, sed edits text, awk works with columns, jq reads JSON. Together they process huge logs quickly.", try: "Count the requests per status code in a web server log using awk." },
      { t: "When to use Python instead", d: "Once a script needs data structures, error handling or more than ~50 lines, Python is clearer.", try: "Rewrite your log counter in Python and compare." },
    ],
    project: "Write a script that backs up a folder, deletes backups older than 7 days, and run it daily with cron.",
  },

  docker: {
    simple: "Docker packages your app with everything it needs into a container, so it runs the same on your laptop, your teammate’s and the server.",
    uses: ["End “it works on my machine” problems", "Run databases locally in one command", "Deploy apps the way most companies do"],
    example: {
      file: "Dockerfile",
      code: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`,
      output: `$ docker build -t my-api .
$ docker run -p 3000:3000 my-api
Running on http://localhost:3000`,
      note: "A recipe for building an image of your app, then running it as a container on port 3000.",
    },
    steps: [
      { t: "Images vs containers", d: "An image is a frozen package (the recipe’s result). A container is a running copy of an image. You can run many containers from one image.", try: "Run docker run -it ubuntu bash and look around inside the container." },
      { t: "Writing Dockerfiles", d: "Each line is a layer. Docker caches layers, so copy package files and install dependencies before copying your code for faster rebuilds.", try: "Write a Dockerfile for one of your apps and build it." },
      { t: "Volumes and networking", d: "Containers lose their files when deleted; volumes keep data. Port mapping (-p 3000:3000) connects a container to your computer.", try: "Run PostgreSQL in Docker with a volume and confirm the data survives a restart." },
      { t: "Docker Compose", d: "Compose starts several containers together (app + database + cache) from one docker-compose.yml file.", try: "Write a compose file that runs your API and a PostgreSQL database." },
    ],
    project: "Containerise your full-stack app with Docker Compose so anyone can run it with one command: docker compose up.",
  },

  'ci-cd': {
    simple: "CI/CD automatically tests and deploys your code every time you push, so bugs are caught early and releases are boring.",
    uses: ["Run tests on every pull request automatically", "Deploy to production with zero manual steps", "Keep quality high on a team"],
    example: {
      file: ".github/workflows/ci.yml",
      code: `name: CI
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm test`,
      note: "On every push or pull request, GitHub starts a fresh machine, installs your project and runs the tests.",
    },
    steps: [
      { t: "CI basics", d: "Continuous Integration means every change is built, linted and tested automatically. A red check on a pull request means don’t merge.", try: "Break a test on purpose, push it, and watch the pipeline fail." },
      { t: "GitHub Actions", d: "Workflows live in .github/workflows. They’re made of jobs and steps. Secrets (API keys) are stored in repo settings, not in the file.", try: "Add a workflow that runs your tests and a linter on every pull request." },
      { t: "Artifacts and registries", d: "A pipeline can build a Docker image and push it to a registry (GitHub Container Registry, Docker Hub) ready for deployment.", try: "Extend your workflow to build and push a Docker image when main changes." },
    ],
    project: "Set up a pipeline that tests every pull request and automatically deploys main to production.",
  },

  cloud: {
    simple: "The cloud means renting computers, storage and databases from companies like AWS instead of owning servers.",
    uses: ["Host apps that scale to millions of users", "Store files and backups cheaply", "It’s required for most DevOps and backend jobs"],
    example: {
      file: "Terminal",
      code: `aws s3 mb s3://my-portfolio-site-2026
aws s3 cp ./dist s3://my-portfolio-site-2026 --recursive
aws s3 ls s3://my-portfolio-site-2026`,
      output: `make_bucket: my-portfolio-site-2026
upload: dist/index.html to s3://my-portfolio-site-2026/index.html
2026-11-14 10:02:11       1140 index.html`,
      note: "Create a storage bucket, upload your built website, then list the files. This is how many static sites are hosted.",
    },
    steps: [
      { t: "IAM: who can do what", d: "IAM controls access. Give each person or service only the permissions it needs (least privilege) and turn on MFA for your account.", try: "Create an IAM user for yourself with MFA and stop using the root account." },
      { t: "Compute", d: "EC2 is a virtual server you manage. ECS runs containers. Lambda runs a function only when called and charges per use.", try: "Launch a free-tier EC2 instance, SSH in, then terminate it." },
      { t: "Storage and databases", d: "S3 stores files. RDS runs managed PostgreSQL or MySQL. DynamoDB is a fast NoSQL database.", try: "Host a static website in S3." },
      { t: "Networking", d: "A VPC is your private network in the cloud. Subnets divide it. Security groups are firewalls that decide which traffic gets in.", try: "Allow only port 22 from your IP and port 80 from anywhere in a security group." },
    ],
    project: "Deploy your containerised app on AWS with a managed database, and set a billing alert so you never get surprised.",
  },

  kubernetes: {
    simple: "Kubernetes runs lots of containers across many servers for you: it starts them, restarts crashed ones and scales them up when traffic grows.",
    uses: ["Run large apps reliably", "Deploy without downtime", "It’s one of the most in-demand DevOps skills"],
    example: {
      file: "deployment.yaml",
      code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api
spec:
  replicas: 3
  selector:
    matchLabels: { app: my-api }
  template:
    metadata:
      labels: { app: my-api }
    spec:
      containers:
        - name: api
          image: ghcr.io/me/my-api:1.0
          ports: [{ containerPort: 3000 }]`,
      output: `$ kubectl apply -f deployment.yaml
deployment.apps/my-api created
$ kubectl get pods
my-api-7d9f-abcde   1/1   Running
my-api-7d9f-fghij   1/1   Running
my-api-7d9f-klmno   1/1   Running`,
      note: "Ask Kubernetes for 3 copies of your API. It keeps 3 running, replacing any that crash.",
    },
    steps: [
      { t: "Pods, Deployments and Services", d: "A pod runs your container(s). A Deployment keeps the right number of pods running. A Service gives them one stable address.", try: "Install minikube or kind and deploy nginx with 2 replicas." },
      { t: "Config and secrets", d: "ConfigMaps hold settings, Secrets hold passwords and keys, and volumes keep data. Keep them out of your images.", try: "Pass an environment variable to your app through a ConfigMap." },
      { t: "Ingress", d: "An Ingress routes outside web traffic (myapp.com/api) to the right Service inside the cluster.", try: "Expose your app through an Ingress on your local cluster." },
      { t: "Scaling and health checks", d: "Liveness probes restart stuck apps, readiness probes hold traffic until an app is ready, and autoscaling adds pods under load.", try: "Add a readiness probe and watch a rolling update with kubectl rollout status." },
    ],
    project: "Deploy your full-stack app to a local Kubernetes cluster with a Deployment, Service, Ingress, ConfigMap and health checks.",
  },

  iac: {
    simple: "Infrastructure as Code means describing your servers, databases and networks in files, so you can create and change them with commands instead of clicking.",
    uses: ["Rebuild your whole setup in minutes", "Review infrastructure changes like code", "Avoid “someone clicked something” mistakes"],
    example: {
      file: "main.tf",
      code: `provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "site" {
  bucket = "my-portfolio-site-2026"
}`,
      output: `$ terraform plan
  + aws_s3_bucket.site will be created
Plan: 1 to add, 0 to change, 0 to destroy.`,
      note: "Describe the bucket you want. terraform plan shows what will change before anything happens.",
    },
    steps: [
      { t: "Declarative vs imperative", d: "Imperative: list the steps. Declarative: describe the end result and let the tool figure out the steps. Terraform is declarative.", try: "Write the same task (create a folder with a file) both ways in plain words." },
      { t: "Terraform basics", d: "Providers connect to clouds, resources are things to create, state remembers what exists, and modules package reusable pieces.", try: "Create and destroy an S3 bucket with Terraform." },
      { t: "Plan, apply and remote state", d: "Always run plan and read it before apply. Store state remotely (like an S3 bucket) so a team shares one source of truth.", try: "Change a tag on your bucket and read the plan before applying." },
    ],
    project: "Define your app’s cloud setup (network, server or container service, database) entirely in Terraform.",
  },

  observability: {
    simple: "Observability means collecting information from your running app so you can see when something breaks and figure out why.",
    uses: ["Find out about problems before users complain", "Debug production issues quickly", "Measure how fast your app really is"],
    example: {
      file: "logger.js",
      code: `import pino from "pino";
const log = pino();

log.info({ userId: 42, orderId: 981, ms: 132 }, "order placed");
log.error({ orderId: 982, err: "card_declined" }, "payment failed");`,
      output: `{"level":30,"userId":42,"orderId":981,"ms":132,"msg":"order placed"}
{"level":50,"orderId":982,"err":"card_declined","msg":"payment failed"}`,
      note: "Structured (JSON) logs can be searched and filtered, like “show all failed payments in the last hour”.",
    },
    steps: [
      { t: "Metrics, logs and traces", d: "Metrics are numbers over time (requests per second). Logs are events (“payment failed”). Traces follow one request through every service.", try: "Pick an app you built and list 3 metrics you’d want to watch." },
      { t: "Prometheus and Grafana", d: "Prometheus collects metrics, Grafana draws dashboards and sends alerts.", try: "Run Prometheus and Grafana with Docker Compose and graph a demo metric." },
      { t: "Structured logging", d: "Log JSON with useful fields (user, request id, duration) instead of plain sentences, so you can search them.", try: "Replace console.log in your API with a JSON logger." },
      { t: "OpenTelemetry", d: "OpenTelemetry is the standard way to collect traces, metrics and logs from any language and send them to any tool.", try: "Add OpenTelemetry auto-instrumentation to your API and view a trace." },
    ],
    project: "Add a Grafana dashboard for your app (requests, errors, response time) with an alert when errors spike.",
  },

  sre: {
    simple: "Site Reliability Engineering is the practice of keeping services running reliably, measuring reliability with numbers and learning from every outage.",
    uses: ["Decide how reliable a service needs to be", "Handle outages calmly with a plan", "Prevent the same incident from happening twice"],
    example: {
      file: "slo.yaml",
      code: `service: checkout-api
sli: share of requests that succeed in under 300 ms
slo: 99.9% over 30 days
error_budget: 43 minutes of failure per month
policy: if the budget runs out, pause new features and fix reliability`,
      note: "An SLO turns “be reliable” into a number the team can track and make decisions with.",
    },
    steps: [
      { t: "SLIs, SLOs and error budgets", d: "An SLI is what you measure (success rate). An SLO is the target (99.9%). The error budget is the failure you can afford before you must slow down.", try: "Write an SLI and SLO for an app you built." },
      { t: "Incidents and on-call", d: "When something breaks: declare an incident, assign roles, communicate status, fix the symptom first, then the cause.", try: "Write a short runbook for “the database is down”." },
      { t: "Blameless postmortems", d: "After an incident, write what happened, why, and what will change. Focus on systems, not blaming people.", try: "Read a public postmortem (Cloudflare, GitLab) and summarise its key lesson." },
    ],
    project: "Define SLOs for your deployed app, set up alerts on them, and write a postmortem for a pretend outage.",
  },

  'cloud-networking': {
    simple: "Cloud networking is how you build a private, secure network for your apps inside AWS or Azure, and control what can talk to what.",
    uses: ["Keep databases private and off the internet", "Route traffic safely to your apps", "Design networks for real companies"],
    example: {
      file: "Network plan",
      code: `VPC 10.0.0.0/16
├── public subnet  10.0.1.0/24  → load balancer   (internet gateway)
├── private subnet 10.0.2.0/24  → app servers     (NAT for updates)
└── private subnet 10.0.3.0/24  → database        (no internet at all)`,
      note: "Only the load balancer faces the internet. The app and database hide in private subnets.",
    },
    steps: [
      { t: "VPCs and subnets", d: "A VPC is your private network with an address range (CIDR). Public subnets can reach the internet; private ones can’t be reached from it.", try: "Create a VPC with one public and one private subnet." },
      { t: "Routes, gateways and NAT", d: "Route tables decide where traffic goes. An internet gateway connects public subnets. NAT lets private servers download updates without being reachable.", try: "Draw the path a request takes from the internet to a private app server." },
      { t: "Firewalls", d: "Security groups are firewalls on each resource. Network ACLs are firewalls on whole subnets.", try: "Allow the app servers to reach the database on port 5432 and nothing else." },
    ],
    project: "Build a three-tier network (public load balancer, private app, private database) with Terraform.",
  },

  'cloud-security': {
    simple: "Cloud security is about making sure only the right people and services can access your cloud resources and secrets.",
    uses: ["Prevent account takeovers and data leaks", "Pass security audits", "Avoid huge surprise bills from stolen keys"],
    example: {
      file: "policy.json",
      code: `{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::my-photos/*"
  }]
}`,
      note: "This policy allows reading files from one bucket and nothing else. That’s least privilege.",
    },
    steps: [
      { t: "Users, groups, roles and policies", d: "Policies list allowed actions. Attach them to groups of people, or to roles that services and apps assume.", try: "Create a group with read-only access and add a test user." },
      { t: "Least privilege and roles", d: "Give only the access needed. Let apps use roles with short-lived credentials instead of long-lived access keys in config files.", try: "Give an EC2 instance or Lambda a role to read one S3 bucket, with no keys." },
      { t: "Secrets managers", d: "Store database passwords and API keys in a secrets manager, and let your app fetch them at runtime.", try: "Store a secret in AWS Secrets Manager or Azure Key Vault and read it from code." },
    ],
    project: "Audit your AWS account: remove unused keys, enable MFA everywhere, and move every secret into a secrets manager.",
  },

  serverless: {
    simple: "Serverless means you write small functions and the cloud runs them only when needed. No servers to manage, and you pay only for what you use.",
    uses: ["Build APIs that cost almost nothing at low traffic", "React to events like file uploads automatically", "Ship backends without managing servers"],
    example: {
      file: "handler.py",
      code: `import json

def handler(event, context):
    name = event.get("queryStringParameters", {}).get("name", "world")
    return {
        "statusCode": 200,
        "body": json.dumps({"message": f"Hello, {name}!"}),
    }`,
      output: `GET /hello?name=Ana
{"message": "Hello, Ana!"}`,
      note: "An AWS Lambda function. It only runs when someone calls the URL, and AWS handles the servers.",
    },
    steps: [
      { t: "Functions as a service", d: "Lambda and Azure Functions run your code in response to a trigger. They start fast, scale automatically and shut down when idle.", try: "Deploy a hello-world Lambda with an HTTP URL." },
      { t: "Event-driven design", d: "Functions can run when a file is uploaded, a message arrives in a queue, or on a schedule, connecting services without servers.", try: "Make a function that runs whenever an image is uploaded to S3 and logs its name." },
      { t: "Managed services", d: "Pair functions with managed databases (DynamoDB), queues (SQS) and storage (S3) so the whole app is serverless.", try: "Save data from your function into DynamoDB." },
    ],
    project: "Build a serverless image thumbnail service: upload to S3, a function makes a thumbnail, and saves the details to a database.",
  },

  'cloud-architecture': {
    simple: "Cloud architecture is designing systems in the cloud that are reliable, secure and affordable, and proving it with a certification.",
    uses: ["Design systems that survive failures", "Keep cloud bills under control", "Get certified to stand out to employers"],
    example: {
      file: "Architecture checklist",
      code: `[x] Runs in 2+ availability zones
[x] Database has automated backups and a tested restore
[x] Budget alert at 80% of monthly spend
[x] Least-privilege IAM roles, no root usage
[x] Dev resources shut down at night`,
      note: "A simple checklist based on the Well-Architected pillars that you can apply to any project.",
    },
    steps: [
      { t: "The Well-Architected pillars", d: "Reliability, security, cost, performance, operations and sustainability. Every design decision trades these off against each other.", try: "Review one of your deployed apps against each pillar in one line." },
      { t: "High availability", d: "Run in multiple availability zones (separate data centres), keep backups, and practise failover so one failure doesn’t take you down.", try: "Draw your app running across two availability zones." },
      { t: "Cost control", d: "Set budgets and alerts, right-size servers, and turn off what you don’t use. Most cloud waste is idle resources.", try: "Set a budget alert and find your most expensive resource in Cost Explorer." },
      { t: "Your first certification", d: "AWS Cloud Practitioner or Azure Fundamentals (AZ-900) cover the basics and are a good first credential.", try: "Take a free practice exam and note your weak areas." },
    ],
    project: "Write a one-page architecture doc for one of your apps: a diagram, the services it uses and a monthly cost estimate. When you feel ready, book AWS Cloud Practitioner or AZ-900.",
  },
};
