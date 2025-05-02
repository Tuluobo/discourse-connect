import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-primary to-primary/80 py-20 text-primary-foreground md:py-32">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(from_var(--primary-foreground)_r_g_b_/_0.075)_1px,transparent_1px),linear-gradient(to_bottom,rgba(from_var(--primary-foreground)_r_g_b_/_0.075)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -left-24 -top-24 h-64 w-64 animate-pulse rounded-full bg-foreground/15 blur-3xl"></div>
      <div
        className="absolute -bottom-24 -right-24 h-64 w-64 animate-pulse rounded-full bg-foreground/15 blur-3xl"
        style={{ animationDelay: "1.5s" }}
      ></div>

      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-6 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            准备好使用数字牧民账号登录了吗？
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl"
          >
            立即开始使用数字牧民
            Connect，为您的应用提供安全、便捷的身份验证服务。
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex flex-col gap-4 sm:flex-row"
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 cursor-pointer rounded-full px-8 text-base shadow-md transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
              >
                立即体验
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
            <Link href="https://github.com/Tuluobo/discourse-connect">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full bg-transparent px-8 text-base transition-all duration-300 hover:translate-y-[-2px]"
              >
                查看 GitHub
              </Button>
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-4 text-sm text-primary-foreground/80"
          >
            使用数字牧民账号。简单集成。开源项目。
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
