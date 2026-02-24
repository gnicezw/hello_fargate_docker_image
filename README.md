ChatGPT suggested new server workflow - consult previous setup logs for exact/recommended method:
Here’s a clean, README-ready version you can paste directly into GitHub.

---

# 🚀 Deployment Workflow (Fresh Server → Running Container)

Straight workflow:

**Clone → Build Docker image → Run container → Test**

---

## 1️⃣ Install Prerequisites (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install -y git docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker
```

Verify Docker is working:

```bash
docker run --rm hello-world
```

---

## 2️⃣ (Optional) Verify GitHub SSH Access

If using SSH:

```bash
ssh -T git@github.com
```

You should see:

```
Hi <username>! You've successfully authenticated...
```

---

## 3️⃣ Clone the Repository

### Using SSH

```bash
git clone git@github.com:<user>/<repo>.git
```

### Or HTTPS

```bash
git clone https://github.com/<user>/<repo>.git
```

Enter the project directory:

```bash
cd <repo>
```

---

## 4️⃣ Build the Docker Image

```bash
docker build -t myapp:dev .
```

---

## 5️⃣ Run the Container

If the app listens on port **3000**:

```bash
docker run --rm -it -p 3000:3000 --name myapp myapp:dev
```

If your app uses a different port, adjust the `-p` flag:

```
-p <host_port>:<container_port>
```

---

## 6️⃣ Test the Application

From the server:

```bash
curl -i http://localhost:3000
```

From your laptop/browser:

```
http://<server_public_ip>:3000
```

> ⚠️ If using AWS Lightsail, make sure port `3000` is open in the Networking/Firewall settings.

---

## 7️⃣ Stop the Container

If running in foreground:

```
Ctrl + C
```

Or from another shell:

```bash
docker stop myapp
```

---

## 🔎 If You’re Unsure Which Port the App Uses

```bash
grep -nE "EXPOSE|listen\(|PORT" Dockerfile index.js package.json 2>/dev/null
```

This usually reveals the container port to publish with `-p host:container`.

---

That’s it — fully reproducible on any new server.
