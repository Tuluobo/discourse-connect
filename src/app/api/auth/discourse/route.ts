import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";
import WordArray from "crypto-js/lib-typedarrays";

import { AUTH_NONCE } from "@/lib/constants";

const hostUrl = process.env.NEXT_PUBLIC_HOST_URL as string;
const discourseHost = process.env.DISCOURSE_HOST as string;
const clientSecret = process.env.DISCOURSE_SECRET as string;

export async function POST(request: NextRequest) {
  const nonce = WordArray.random(16).toString();

  // 检查是否有 OAuth 参数需要保存
  let return_url = `${hostUrl}/authorize`;

  try {
    const body = await request.json();
    if (body.oauth_params) {
      // 如果有 OAuth 参数，在登录成功后重定向到 OAuth 授权流程
      const oauthParams = encodeURIComponent(body.oauth_params);
      return_url = `${hostUrl}/authorize?oauth_redirect=1&oauth_params=${oauthParams}`;
    }
  } catch {
    // 如果没有 body 或解析失败，使用默认返回 URL
  }

  const sso = btoa(`nonce=${nonce}&return_sso_url=${return_url}`);
  const sig = hmacSHA256(sso, clientSecret).toString(Hex);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_NONCE, nonce, { maxAge: 60 * 10 });
  return Response.json({
    sso_url: `${discourseHost}/session/sso_provider?sso=${sso}&sig=${sig}`,
  });
}
