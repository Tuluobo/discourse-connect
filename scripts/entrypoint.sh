#!/bin/sh

# 生成一个 JS 文件，把环境变量注入到 window 对象
cat <<EOF > ./public/env.js
window.__ENV__ = {
  NEXT_PUBLIC_HOST_URL: "${NEXT_PUBLIC_HOST_URL}",
  NEXT_PUBLIC_GA_ID: "${NEXT_PUBLIC_GA_ID}",
  NEXT_PUBLIC_UMAMI_SCRIPT: "${NEXT_PUBLIC_UMAMI_SCRIPT}",
  NEXT_PUBLIC_UMAMI_WEBSITE_ID: "${NEXT_PUBLIC_UMAMI_WEBSITE_ID}",
};
EOF

get_ip() {
  local ip_addr=""
  
  # 尝试使用 ip 命令
  if command -v ip >/dev/null 2>&1; then
    # 获取内网 IP 地址（192.168.x.x, 10.x.x.x, 172.16-31.x.x）
    ip_addr=$(ip addr show | grep -E "inet (192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)" | head -n1 | awk '{print $2}' | cut -d/ -f1)
  fi
  
  # 如果 ip 命令失败或没有找到内网 IP，尝试 ifconfig
  if [[ -z "$ip_addr" ]] && command -v ifconfig >/dev/null 2>&1; then
    ip_addr=$(ifconfig | grep -E "inet.*broadcast" | awk '{print $2}' | head -1)
  fi
  
  # 输出结果
  echo "${ip_addr:-127.0.0.1}"
}

# 导出环境变量
export IP_ADDR="$(get_ip)"
echo "✓ Ip Address: $IP_ADDR"

# start server
exec pnpm start-docker