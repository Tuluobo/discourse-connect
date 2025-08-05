import {
  Code,
  Contrast,
  FileCode,
  Layers,
  Paintbrush,
  PaintBucket,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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
  const t = useTranslations("features");

  const features = [
    {
      title: t("items.oauth2.title"),
      description: t("items.oauth2.description"),
      icon: <Code className="size-5" />,
    },
    {
      title: t("items.sso.title"),
      description: t("items.sso.description"),
      icon: <FileCode className="size-5" />,
    },
    {
      title: t("items.sync.title"),
      description: t("items.sync.description"),
      icon: <Paintbrush className="size-5" />,
    },
    {
      title: t("items.multiApp.title"),
      description: t("items.multiApp.description"),
      icon: <Layers className="size-5" />,
    },
    {
      title: t("items.secure.title"),
      description: t("items.secure.description"),
      icon: <PaintBucket className="size-5" />,
    },
    {
      title: t("items.easy.title"),
      description: t("items.easy.description"),
      icon: <Contrast className="size-5" />,
    },
  ];
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
            <span className="text-primary mr-1">✦</span> {t("badge")}
          </Badge>
          <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-[800px] md:text-lg">
            {t("description")}
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
              <Card className="group border-border/40 from-card to-card/50 hover:border-primary/20 h-full overflow-hidden bg-gradient-to-b backdrop-blur transition-all hover:shadow-lg">
                <CardContent className="flex h-full flex-col p-6">
                  <div className="bg-primary/10 text-primary group-hover:bg-primary/20 mb-4 flex size-12 items-center justify-center rounded-full transition-colors duration-300">
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
