import { motion } from "motion/react";

import { Badge } from "@/components/ui/badge";

const steps = [
  {
    step: "01",
    title: "注册应用",
    description: "在数字牧民 Connect 平台注册您的应用，获取客户端 ID 和密钥。",
  },
  {
    step: "02",
    title: "集成 OAuth 2.0",
    description:
      "使用我们提供的 API 并按照文档说明集成 OAuth 2.0 认证流程到您的应用中。",
  },
  {
    step: "03",
    title: "用户授权",
    description: "用户通过数字牧民账号授权登录，无需创建新账号，简化用户体验。",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-muted/30 relative isolate w-full overflow-hidden py-20 md:py-32"
    >
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--muted-foreground)_r_g_b_/_0.05)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="relative container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center justify-center space-y-4 text-center"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
            variant="secondary"
          >
            <span className="text-primary mr-1">✦</span> 使用流程
          </Badge>
          <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            简单流程，快速集成
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            只需几个简单步骤，即可将 Discourse 账号认证集成到您的应用中。
          </p>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center space-y-4 text-center"
            >
              <div className="from-primary to-primary/70 text-primary-foreground relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold shadow-lg">
                {step.step}
                <div
                  className="bg-primary/20 absolute inset-0 animate-ping rounded-full opacity-75"
                  style={{
                    animationDuration: "3s",
                    animationDelay: `${i * 0.5}s`,
                  }}
                ></div>
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
