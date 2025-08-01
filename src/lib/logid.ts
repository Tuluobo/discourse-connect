/**
 * LogID生成器 - 支持 Node.js 和 Edge Runtime 环境
 * 格式: 年月日时分秒(14位) + 机器IP(12位) + 版本信息(2位) + 随机串(6位)
 * 示例: 2017011110405501000613107801058EAC
 */

class LogIDGenerator {
  private machineIP: string;
  private version: string = "01"; // 版本号固定为01
  private isEdgeRuntime: boolean;

  constructor() {
    this.isEdgeRuntime = this.detectEdgeRuntime();
    this.machineIP = this.formatIPTo12Digits(this.getIP());
  }

  /**
   * 检测是否在 Edge Runtime 环境中
   */
  private detectEdgeRuntime(): boolean {
    // Edge Runtime 环境检测
    if (typeof EdgeRuntime !== "undefined") return true;
    if (typeof process !== "undefined" && process.env?.NEXT_RUNTIME === "edge")
      return true;
    // 检查是否有 os 模块可用
    try {
      require.resolve("os");
      return false;
    } catch {
      return true;
    }
  }

  /**
   * 获取机器IP并转换为12位字符串
   */
  private getIP(): string {
    // 首先检查环境变量 IP_ADDR
    const envIP = this.getEnvVariable("IP_ADDR");
    if (envIP) {
      return envIP;
    }

    // 如果环境变量不存在，则根据运行环境获取IP
    if (this.isEdgeRuntime) {
      return "127.0.0.1";
    }

    try {
      // Node.js 环境：动态导入 os 模块
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const os = require("os");
      const networkInterfaces = os.networkInterfaces();
      let ip = "127.0.0.1"; // 默认IP

      // 查找第一个非回环的IPv4地址
      for (const interfaceName in networkInterfaces) {
        const addresses = networkInterfaces[interfaceName];
        if (addresses) {
          for (const addr of addresses) {
            if (addr.family === "IPv4" && !addr.internal) {
              ip = addr.address;
              break;
            }
          }
        }
        if (ip !== "127.0.0.1") break;
      }
      return ip;
    } catch {
      return "127.0.0.1";
    }
  }

  /**
   * 获取环境变量（兼容不同运行环境）
   */
  private getEnvVariable(name: string): string | undefined {
    if (typeof process !== "undefined" && process.env) {
      return process.env[name];
    }
    return undefined;
  }

  /**
   * 将IP地址格式化为12位字符串
   */
  private formatIPTo12Digits(ip: string): string {
    const parts = ip.split(".");
    if (parts.length === 4) {
      // 标准IPv4地址：每段补零到3位
      return parts.map((part) => part.padStart(3, "0")).join("");
    } else {
      // 非标准格式：截取或补零到12位
      const cleaned = ip.replace(/[^0-9]/g, ""); // 只保留数字
      return cleaned.padStart(12, "0").slice(0, 12);
    }
  }

  /**
   * 生成6位随机字符串（大写字母和数字）
   */
  private generateRandomString(): string {
    const chars = "0123456789ABCDEF";
    let result = "";

    // Edge Runtime 支持 crypto.getRandomValues
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      const array = new Uint8Array(6);
      crypto.getRandomValues(array);
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(array[i] % chars.length);
      }
    } else {
      // 备用方案：使用 Math.random
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
    }

    return result;
  }

  /**
   * 格式化时间为YYYYMMDDHHMMSS格式
   */
  private formatDateTime(date: Date = new Date()): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return year + month + day + hour + minute + second;
  }

  /**
   * 生成LogID
   */
  logid(date?: Date): string {
    const timestamp = this.formatDateTime(date);
    const randomStr = this.generateRandomString();
    return timestamp + this.machineIP + this.version + randomStr;
  }
}

export default LogIDGenerator;

// 导出便捷函数
export const generateLogID = (): string => {
  const generator = new LogIDGenerator();
  return generator.logid();
};
