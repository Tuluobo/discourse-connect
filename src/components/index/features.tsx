import {
  Code,
  Contrast,
  FileCode,
  Layers,
  Paintbrush,
  PaintBucket,
} from "lucide-react";
import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "OAuth 2.0 协议",
    description:
      "基于标准 OAuth 2.0 协议实现，支持授权码模式，确保安全可靠的身份验证流程。",
    icon: <Code className="size-5" />,
  },
  {
    title: "数字牧民 SSO 集成",
    description:
      "无缝集成数字牧民社区单点登录系统，让用户使用已有的数字牧民账号进行身份验证。",
    icon: <FileCode className="size-5" />,
  },
  {
    title: "用户信息同步",
    description:
      "自动同步用户的基本信息、头像、角色和权限，保持数据的一致性和实时性。",
    icon: <Paintbrush className="size-5" />,
  },
  {
    title: "多应用支持",
    description:
      "支持多个客户端应用接入，统一管理用户认证，简化系统架构和维护成本。",
    icon: <Layers className="size-5" />,
  },
  {
    title: "安全可靠",
    description:
      "采用加密传输和签名验证机制，确保认证过程的安全性，防止伪造和篡改。",
    icon: <PaintBucket className="size-5" />,
  },
  {
    title: "简单易用",
    description:
      "提供简洁明了的接口和文档，开发者可以快速集成到自己的应用中，降低开发成本。",
    icon: <Contrast className="size-5" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="relative isolate w-full py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(from_var(--primary)_r_g_b_/_0.03),transparent_70%)]"></div>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="mr-1 text-primary">✦</span> 特性
          </Badge>
          <h2 className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            强大的 OAuth 2.0 认证工具
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            数字牧民 Connect
            提供了所有您需要的工具，让用户使用数字牧民账号进行身份验证，简化登录流程。
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className="group h-full overflow-hidden border-border/40 bg-gradient-to-b from-card to-card/50 backdrop-blur transition-all hover:border-primary/20 hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
