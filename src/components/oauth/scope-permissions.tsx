import {
  Calendar,
  Camera,
  Edit,
  Eye,
  Mail,
  Shield,
  User,
  UserCheck,
} from "lucide-react";

interface ScopePermissionsProps {
  scopes: string[];
  showTitle?: boolean;
}

interface Permission {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  sensitive?: boolean;
}

const scopePermissions: Record<string, Permission[]> = {
  // 基础权限（总是包含）
  basic: [
    {
      icon: User,
      title: "基本个人信息",
      description: "获取您的用户名和用户 ID",
    },
  ],

  // 读取权限
  read: [
    {
      icon: Eye,
      title: "查看个人资料",
      description: "读取您的姓名、头像和个人简介",
    },
    {
      icon: Mail,
      title: "电子邮箱地址",
      description: "获取您的注册邮箱地址",
      sensitive: true,
    },
    {
      icon: Calendar,
      title: "账户创建时间",
      description: "查看您的注册时间和最后活动时间",
    },
  ],

  // 写入权限
  write: [
    {
      icon: Edit,
      title: "代表您执行操作",
      description: "在获得您明确同意后，代表您执行某些操作",
      sensitive: true,
    },
    {
      icon: UserCheck,
      title: "修改个人资料",
      description: "更新您的个人信息和设置",
      sensitive: true,
    },
  ],

  // 管理员权限
  admin: [
    {
      icon: Shield,
      title: "管理员权限",
      description: "访问管理功能（仅限管理员账户）",
      sensitive: true,
    },
  ],

  // 头像权限
  avatar: [
    {
      icon: Camera,
      title: "头像访问",
      description: "获取和显示您的头像图片",
    },
  ],
};

export function ScopePermissions({
  scopes,
  showTitle = true,
}: ScopePermissionsProps) {
  // 获取所有相关权限
  const allPermissions: Permission[] = [];

  // 基础权限总是包含
  allPermissions.push(...scopePermissions.basic);

  // 根据 scopes 添加相应权限
  scopes.forEach((scope) => {
    const permissions = scopePermissions[scope];
    if (permissions) {
      allPermissions.push(...permissions);
    }
  });

  // 如果没有指定特殊 scopes，添加默认的读取权限
  if (scopes.length === 0 || scopes.every((s) => !scopePermissions[s])) {
    allPermissions.push(...scopePermissions.read);
  }

  // 去重（基于 title）
  const uniquePermissions = allPermissions.filter(
    (permission, index, self) =>
      index === self.findIndex((p) => p.title === permission.title),
  );

  return (
    <div className="space-y-3">
      {showTitle && <h4 className="text-sm font-medium">该应用将能够：</h4>}
      <ul className="space-y-3">
        {uniquePermissions.map((permission, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div
              className={`mt-0.5 flex-shrink-0 rounded-md p-1.5 ${
                permission.sensitive
                  ? "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                  : "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
              } `}
            >
              <permission.icon size={14} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{permission.title}</span>
                {permission.sensitive && (
                  <span className="inline-flex items-center rounded bg-orange-100 px-1.5 py-0.5 text-xs font-medium text-orange-800 dark:bg-orange-900/20 dark:text-orange-300">
                    敏感
                  </span>
                )}
              </div>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {permission.description}
              </p>
            </div>
          </li>
        ))}
      </ul>

      {scopes.some((s) => scopePermissions[s]?.some((p) => p.sensitive)) && (
        <div className="mt-4 rounded-md bg-orange-50 p-3 dark:bg-orange-900/10">
          <p className="text-xs text-orange-800 dark:text-orange-300">
            <Shield size={14} className="mr-1.5 inline" />
            标记为&quot;敏感&quot;的权限需要额外注意。请确认您信任该应用。
          </p>
        </div>
      )}
    </div>
  );
}
