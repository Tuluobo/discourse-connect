export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
            服务条款
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>

        {/* Introduction */}
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-4 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="mb-2 font-medium text-blue-800">
                生效日期：2025年7月27日
              </p>
              <p className="text-sm text-blue-700">最后更新：2025年7月27日</p>
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">
              欢迎使用数字牧民连接平台（&ldquo;服务&rdquo;、&ldquo;平台&rdquo;）。本服务由数字牧民社区运营方（&ldquo;我们&rdquo;、&ldquo;运营方&rdquo;、&ldquo;服务提供方&rdquo;）以个人名义在新加坡运营，网址为{" "}
              <a
                href="https://connect.shuzimumin.com"
                className="text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-800 hover:decoration-blue-500"
              >
                https://connect.shuzimumin.com
              </a>
              。使用我们的服务即表示您同意遵守这些服务条款。
            </p>
            <div className="mb-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <h3 className="mb-2 font-bold text-amber-800">重要法律声明</h3>
              <p className="text-sm leading-relaxed text-amber-700">
                本服务由个人实体运营，非公司法人。运营方依据新加坡法律承担个人责任。本条款的某些责任限制可能因个人实体性质而受到法律限制。
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              请仔细阅读这些条款。如果您不同意这些条款，请不要使用本服务。我们保留随时修改这些条款的权利，修改后的条款将在发布后立即生效。
            </p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-8 rounded-lg border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-8">
          <h3 className="mb-6 flex items-center text-xl font-semibold text-gray-900">
            <svg
              className="mr-2 h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            目录导航
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <a
              href="#heading--important-terms"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              重要条款
            </a>
            <a
              href="#heading--permission"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              您使用本平台的权限
            </a>
            <a
              href="#heading--conditions"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              本平台使用条件
            </a>
            <a
              href="#heading--acceptable-use"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              可接受的使用
            </a>
            <a
              href="#heading--content-standards"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              内容标准
            </a>
            <a
              href="#heading--enforcement"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              执法
            </a>
            <a
              href="#heading--your-account"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              您的帐户
            </a>
            <a
              href="#heading--your-content"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              您的内容
            </a>
            <a
              href="#heading--responsibility"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              您的责任
            </a>
            <a
              href="#heading--disclaimers"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              免责声明
            </a>
            <a
              href="#heading--liability"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              责任限制
            </a>
            <a
              href="#heading--feedback"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              反馈
            </a>
            <a
              href="#heading--termination"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              终止
            </a>
            <a
              href="#heading--disputes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              争议
            </a>
            <a
              href="#heading--general"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              一般条款
            </a>
            <a
              href="#heading--contact"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              联系方式
            </a>
            <a
              href="#heading--changes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              变更
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Important Terms */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--important-terms"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--important-terms"
                className="transition-colors hover:text-blue-600"
              >
                重要条款
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <p className="leading-relaxed text-amber-800">
                <strong>
                  这些条款包括许多影响您的权利和责任的重要条款，如
                  <a
                    href="#heading--disclaimers"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    免责声明
                  </a>
                  中的免责声明、
                  <a
                    href="#heading--liability"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    责任限制
                  </a>
                  中我们对您的责任限制、您同意依据
                  <a
                    href="#heading--responsibility"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    使用的责任
                  </a>
                  赔偿我们因您滥用本平台而造成的损失并同意依据
                  <a
                    href="#heading--disputes"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    争议
                  </a>
                  解决争议。
                </strong>
              </p>
            </div>
          </section>

          {/* Permission */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--permission"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--permission"
                className="transition-colors hover:text-blue-600"
              >
                您使用本平台的权限
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="leading-relaxed text-gray-700">
              我们依据这些条款向您授予使用本平台的权限。每个人都需要同意这些条款才能使用本平台。
            </p>
          </section>
          {/* Conditions */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--conditions"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--conditions"
                className="transition-colors hover:text-blue-600"
              >
                本平台使用条件
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              您使用本服务需满足以下基本条件：
            </p>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  1
                </span>
                <p className="leading-relaxed">
                  您必须年满13周岁，或在父母/监护人同意下使用本服务。
                </p>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  2
                </span>
                <p className="leading-relaxed">
                  您必须遵守适用的法律法规和社区准则。
                </p>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  3
                </span>
                <p className="leading-relaxed">
                  您同意提供真实、准确的注册信息，并及时更新。
                </p>
              </li>
            </ol>
          </section>
          {/* Acceptable Use */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--acceptable-use"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--acceptable-use"
                className="transition-colors hover:text-blue-600"
              >
                可接受的使用
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  1
                </span>
                <p className="leading-relaxed">在使用本平台时不得违反法律。</p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  2
                </span>
                <p className="leading-relaxed">
                  未经他人特别许可，不得在本平台上使用或试图使用他人的帐户。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  3
                </span>
                <p className="leading-relaxed">
                  不得在本平台上购买、出售或以其他方式交易用户名或其他唯一标识符。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  4
                </span>
                <p className="leading-relaxed">
                  不得通过本平台发送广告、连锁信或其他征求，也不得使用本平台收集地址或其他个人数据，将其用于商业邮寄名单或数据库。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  5
                </span>
                <p className="leading-relaxed">
                  不得自动访问本平台，或监控本平台，如通过网络爬虫、浏览器插件或加载项，或其他非
                  Web
                  浏览器的计算机程序。如果您运行公开的搜索引擎，您可以爬取本平台来为该搜索引擎建立索引。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  6
                </span>
                <p className="leading-relaxed">
                  不得使用本平台向分发名单、新闻组或群组邮件别名发送电子邮件。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  7
                </span>
                <p className="leading-relaxed">
                  不得虚假地暗示您隶属于我们或得到我们的认可。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  8
                </span>
                <p className="leading-relaxed">
                  不得在其他网页上对本平台上的图片或其他非超文本内容建立超链接。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  9
                </span>
                <p className="leading-relaxed">
                  不得从在本平台上下载的材料中删除任何显示专有所有权的标记。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  10
                </span>
                <p className="leading-relaxed">
                  不得在其他网站上使用{" "}
                  <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                    &lt;iframe&gt;
                  </code>{" "}
                  显示本平台的任何部分。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  11
                </span>
                <p className="leading-relaxed">
                  不得禁用、避免或规避本平台的任何安全或访问限制。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  12
                </span>
                <p className="leading-relaxed">
                  不得通过不合理的请求量，或旨在对本平台底层的信息系统施加不合理负载的请求而使本平台的基础设施紧张。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  13
                </span>
                <p className="leading-relaxed">不得通过本平台冒充他人。</p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  14
                </span>
                <p className="leading-relaxed">
                  不得鼓励或帮助任何人违反这些条款。
                </p>
              </div>
            </div>
          </section>
          {/* Content Standards */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--content-standards"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--content-standards"
                className="transition-colors hover:text-blue-600"
              >
                内容标准
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  1
                </span>
                <p className="leading-relaxed">
                  不得向本平台提交非法、冒犯性或伤害他人的内容。这包括存在骚扰、不当、辱骂或仇恨行为的内容。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  2
                </span>
                <p className="leading-relaxed">
                  不得向本平台提交违反法律、侵犯任何人的知识产权、侵犯任何人隐私或违反您与他人签订的协议的内容。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  3
                </span>
                <p className="leading-relaxed">
                  不得向本平台提交包含恶意计算机代码（如计算机病毒或间谍软件）的内容。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  4
                </span>
                <p className="leading-relaxed">
                  不得以占位符形式向本平台提交内容来保留特定地址、用户名或其他唯一标识符。
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  5
                </span>
                <p className="leading-relaxed">
                  不得使用本平台披露您无权披露的信息，如他人的机密或个人信息。
                </p>
              </div>
            </div>
          </section>
          {/* Enforcement */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--enforcement"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--enforcement"
                className="transition-colors hover:text-blue-600"
              >
                执法
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                我们可以在最大的法律范围内调查和起诉违反这些条款的行为。我们可以通知执法部门并与之合作起诉违反法律和这些条款的行为。
              </p>
              <p className="leading-relaxed">
                我们保留出于任何理由更改、编辑和删除本平台内容的权利。如果您认为有人在向本平台提交内容时违反了这些条款，请
                <a
                  href="#heading--contact"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  立即联系我们
                </a>
                。
              </p>
            </div>
          </section>
          {/* Your Account */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--your-account"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--your-account"
                className="transition-colors hover:text-blue-600"
              >
                您的帐户
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                您必须创建并登录帐户才能使用本平台的某些功能。
              </p>
              <p className="leading-relaxed">
                要创建帐户，您必须提供有关自己的一些信息。如果您创建帐户，您同意至少提供有效的电子邮件地址，并使该地址保持最新状态。您可以随时通过向{" "}
                <a
                  href="mailto:service@shuzimumin.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  service@shuzimumin.com
                </a>{" "}
                发送电子邮件关闭您的帐户。
              </p>
              <p className="leading-relaxed">
                您同意对使用您的帐户执行的所有操作负责，无论该操作是否经过您的授权，直到您关闭您的帐户或通知我们您的帐户被盗用。如果您怀疑您的帐户被盗用，您同意立即通知我们。您同意为您的帐户选择安全的密码并对其保密。
              </p>
              <p className="leading-relaxed">
                根据相关政策，或者如果我们合理地认为您违反了这些条款中的任何规则，我们可能会限制、暂停或关闭您在本平台上的帐户。
              </p>
            </div>
          </section>
          {/* Your Content */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--your-content"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--your-content"
                className="transition-colors hover:text-blue-600"
              >
                您的内容
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                这些条款中的任何内容都不赋予我们对您在本平台分享的知识产权的任何所有权，例如您的帐户信息、帖子或您提交给本平台的其他内容。这些条款中的任何内容也不赋予您对我们知识产权的任何所有权。
              </p>
              <p className="leading-relaxed">
                在您与我们之间，您仍然对您提交到本平台的内容全权负责。您同意不会错误地暗示您提交到本平台的内容是由我们倡议或获得我们批准的。这些条款并不要求我们根据这些条款存储、维护或提供您提交的内容的副本，也不要求我们对其进行更改。
              </p>
              <p className="leading-relaxed">
                您提交到本平台的内容属于您，您可以决定为别人赋予何种权限。但您至少应允许我们向本平台其他用户提供您提交到本平台的内容。该特殊许可允许我们复制、发布和分析您提交到本平台的内容。
              </p>
              <p className="leading-relaxed">
                当您提交的内容从本平台中删除时，无论是由您还是由我们删除，当最后一份副本从我们的备份、缓存和其他系统中消失时，我们的特殊许可即告终止。您对提交的内容申请的其他许可，如
                <a
                  href="https://creativecommons.org"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  知识共享
                </a>
                许可，可以在您的内容删除后继续。这些许可可以授予他人或我们再次通过本平台分享您的内容的权利。
              </p>
              <p className="leading-relaxed">
                接收您提交到本平台的内容的其他人可能会违反您的内容许可条款。您同意我们不为这些违规行为或其后果对您负责。
              </p>
            </div>
          </section>
          {/* Responsibility */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--responsibility"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--responsibility"
                className="transition-colors hover:text-blue-600"
              >
                您的责任
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="leading-relaxed text-gray-700">
              您同意赔偿我们因您违反这些条款，或因其他人使用您在本平台上的帐户违反这些条款而被他人提起的法律索赔。您和我们都同意尽快就您可能需要赔偿我们的任何法律索赔通知对方。如果我们未能及时通知您某项法律索赔，您不必就您本可以通过及时通知进行辩护或减轻的损失对我们进行赔偿。您同意允许我们控制对您必须赔偿我们的法律索赔进行的调查、辩护和解决，并配合这些努力。我们同意，未经您事先同意，不会同意任何替您认错或给您强加义务的和解。
            </p>
          </section>
          {/* Disclaimers */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--disclaimers"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--disclaimers"
                className="transition-colors hover:text-blue-600"
              >
                免责声明
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                <h3 className="mb-3 font-bold text-red-800">服务现状提供</h3>
                <p className="mb-3 leading-relaxed font-semibold text-red-800">
                  您明确了解并同意，您使用本服务的风险由您自行承担。在适用法律允许的最大范围内，本服务按“现状”和“可用状态”提供，不提供任何形式的明示或暗示保证。
                </p>
                <p className="leading-relaxed text-red-700">
                  我们及其关联方、员工、代理人和供应商特此声明不做出任何保证，包括但不限于：
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    适商性保证
                  </h4>
                  <p className="text-sm text-orange-700">
                    不保证服务的适商性、特定用途适用性或满足特定需求
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    连续性保证
                  </h4>
                  <p className="text-sm text-orange-700">
                    不保证服务将不间断、及时、安全或无错误
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    内容准确性
                  </h4>
                  <p className="text-sm text-orange-700">
                    不保证用户发布内容的准确性、可靠性或完整性
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    第三方服务
                  </h4>
                  <p className="text-sm text-orange-700">
                    不保证第三方网站、服务或内容的质量或安全性
                  </p>
                </div>
              </div>

              <div className="rounded-r-lg border-l-4 border-gray-400 bg-gray-50 p-4">
                <h3 className="mb-2 font-bold text-gray-800">第三方服务声明</h3>
                <p className="leading-relaxed text-gray-700">
                  本服务可能包含指向或接入第三方网站、应用程序或服务的链接。我们不对任何第三方网站或服务的可用性、内容、服务、产品或其他材料承担责任或负责。您使用第三方服务必须遵守相应的第三方服务条款。
                </p>
              </div>
            </div>
          </section>
          {/* Liability */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--liability"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--liability"
                className="transition-colors hover:text-blue-600"
              >
                责任限制
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="leading-relaxed font-semibold text-yellow-800">
                  <strong>间接损害免责：</strong>
                  在法律允许的最大范围内，无论是否在合同、侵权或其他法律理论下，我们及其关联方、员工、代理人和供应商均不对任何间接、特殊、偶发或惩罚性损害承担责任，包括但不限于利润损失、数据丢失、业务中断或其他经济损失。
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="leading-relaxed font-semibold text-red-800">
                  <strong>责任限制：</strong>
                  在法律允许的最大范围内，无论以任何原因或在任何责任理论下，我们对您的累计赔偿责任不得超过：（a）您在事件发生前12个月内向我们实际支付的费用（如有）；或（b）新币1000元。但本限制不适用于法律不允许限制的责任，包括故意不当行为、重大过失或人身伤害。
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="mb-3 leading-relaxed font-medium text-blue-800">
                  <strong>重要提示：</strong>
                  上述限制仅在适用法律允许的范围内有效。如果您住在不允许限制或排除某些损害的法域，则上述某些限制可能不适用于您。
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="leading-relaxed font-medium text-purple-800">
                  <strong>个人实体特别声明：</strong>
                  由于本服务由个人实体运营，运营方承担的是个人责任而非公司有限责任。在新加坡法律框架下，个人实体的责任限制条款可能受到更严格的法律审查。运营方将在法律允许的最大范围内限制责任，但某些情况下可能承担个人无限责任。
                </p>
              </div>
            </div>
          </section>
          {/* Feedback */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--feedback"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--feedback"
                className="transition-colors hover:text-blue-600"
              >
                反馈
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                我们欢迎您对本平台提供反馈和建议。请参阅以下
                <a
                  href="#heading--contact"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  联系
                </a>
                部分，了解与我们联系的方式。
              </p>
              <p className="leading-relaxed">
                您同意我们可以自由地根据您提供的反馈和建议采取行动，并且我们不必通知您相关反馈已被使用，也不必获得您的使用许可或向您付款。您同意不向您或他人提交您认为可能为机密或专有的反馈或建议。
              </p>
            </div>
          </section>
          {/* Termination */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--termination"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--termination"
                className="transition-colors hover:text-blue-600"
              >
                终止
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                您或我们可以随时终止这些条款中所述的协议。当我们的协议终止时，您使用本平台的权限即告终止。
              </p>
              <p className="leading-relaxed">
                以下条款在我们的协议终止后仍然有效：
                <a
                  href="#heading--your-content"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  您的内容
                </a>
                、
                <a
                  href="#heading--feedback"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  反馈
                </a>
                、
                <a
                  href="#heading--responsibility"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  您的责任
                </a>
                、
                <a
                  href="#heading--disclaimers"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  免责声明
                </a>
                、
                <a
                  href="#heading--liability"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  责任限制
                </a>
                和
                <a
                  href="#heading--general"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  一般条款
                </a>
                。
              </p>
            </div>
          </section>
          {/* Disputes */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--disputes"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--disputes"
                className="transition-colors hover:text-blue-600"
              >
                争议
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                <strong>新加坡共和国法律</strong>
                将管控与这些条款或您对本平台的使用有关的任何争议。我们之间的协议应适用新加坡共和国法律，不适用冲突法原则。
              </p>
              <p className="leading-relaxed">
                您和我们同意，因本条款引起或与本条款相关的所有争议，应优先通过友好协商解决。如协商不成，任何一方均可向
                <strong>新加坡高等法院</strong>
                提起诉讼。双方明确同意该法院的专属管辖权。
              </p>
              <div className="rounded-r-lg border-l-4 border-gray-400 bg-gray-50 p-4">
                <p className="leading-relaxed font-semibold text-gray-800">
                  若争议金额超过新币50,000元，双方可协商选择由
                  <strong>新加坡国际仲裁中心（SIAC）</strong>
                  进行仲裁。仲裁将按照新加坡国际仲裁中心仲裁规则进行，仲裁地点为新加坡。仲裁裁决为终局裁决，对双方均有约束力。除涉及知识产权侵权或紧急禁令救济外，各方承诺通过仲裁解决争议，而非诉讼。
                </p>
              </div>
              <p className="leading-relaxed">
                仲裁费用原则上由败诉方承担，但仲裁庭有权根据案件具体情况和各方过错程度决定费用分担。除非法律另有规定，各方自行承担各自的律师费用。仲裁裁决可依法向新加坡高等法院或其他有管辖权的法院申请执行。
              </p>
              <div className="mt-4 rounded-r-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <p className="leading-relaxed font-medium text-orange-800">
                  <strong>个人实体诉讼提示：</strong>
                  鉴于本服务由个人实体运营，在法律程序中，运营方将以个人名义参与诉讼或仲裁。这意味着任何法律判决或仲裁裁决将直接对运营方个人产生约束力和执行效力。用户在选择法律程序时应考虑这一特殊情况。
                </p>
              </div>
            </div>
          </section>
          {/* General */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--general"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--general"
                className="transition-colors hover:text-blue-600"
              >
                一般条款
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                如果这些条款中的某项规定无法按书面规定执行，但可以通过修改使其可以执行，则应在必要的最低范围内修改该规定，使其可以执行。否则，应删除该规定。
              </p>
              <p className="leading-relaxed">
                您不得转让您与我们签订的协议。鉴于我们是个人实体运营，协议的转让需要满足以下条件：（1）我们可以在提前30天书面通知的情况下，将协议转让给接管本平台运营的其他个人或实体；（2）转让后的实体必须同意承担本协议下的所有义务；（3）转让不得实质性改变用户的权利或增加用户的义务。任何不符合上述条件的转让均不具有法律效力。
              </p>
              <p className="leading-relaxed">
                行使本协议项下的任何权利和对任何违反本协议的行为不予追究均不表示对违反本协议的任何其他行为不予追究。
              </p>
              <p className="leading-relaxed">
                这些条款包含了您与我们之间就您对本平台使用达成的所有协议条款。这些条款完全取代关于您的本平台使用的任何其他协议，无论是否为书面协议。
              </p>
            </div>
          </section>
          {/* Contact */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--contact"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--contact"
                className="transition-colors hover:text-blue-600"
              >
                联系方式
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center">
                  <svg
                    className="mr-2 h-5 w-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold text-blue-800">联系邮箱</span>
                </div>
                <p className="leading-relaxed text-blue-700">
                  您可以通过以下方式根据这些条款通知我们，以及将问题发送给我们：
                  <a
                    href="mailto:service@shuzimumin.com"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    service@shuzimumin.com
                  </a>
                  。
                </p>
              </div>
              <p className="leading-relaxed">
                我们可能会根据这些条款，使用您在本平台上为您的帐户提供的电子邮件地址，或通过在本平台首页或您的帐户页面上发布消息来通知您。
              </p>
            </div>
          </section>
          {/* Changes */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h2
              id="heading--changes"
              className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl"
            >
              <a
                href="#heading--changes"
                className="transition-colors hover:text-blue-600"
              >
                变更
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                我们上次更新这些条款的日期为{" "}
                <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-sm">
                  2025-07-27
                </span>
                ，并可能再次更新这些条款。我们将在本平台上发布所有更新。对于包含重大变更的更新，如果您创建了帐户并提供了有效的电子邮件地址，我们同意向您发送电子邮件。我们还可能在本平台上通过特殊消息或提醒来宣布更新。
              </p>
              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed font-medium text-green-800">
                  当您注意到这些条款的更新后，您必须同意这些新条款才能继续使用本平台。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Back to Top Button */}
        <div className="mt-12 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md"
          >
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
            返回顶部
          </a>
        </div>
      </div>
    </div>
  );
}
