export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
            隐私政策
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
              <strong>数字牧民社区运营方</strong>
              （"我们"、"运营方"、"数据控制者"）以个人实体身份在新加坡运营本服务，深知个人信息对您的重要性，并会尽力保护您的个人信息安全可靠。本隐私政策详细说明了我们在您使用数字牧民连接平台（"本服务"）时如何收集、使用、存储、共享和保护您的个人信息，以及您享有的权利。
            </p>
            <div className="mb-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <h3 className="mb-2 font-bold text-amber-800">重要提示</h3>
              <p className="text-sm leading-relaxed text-amber-700">
                本隐私政策严格遵守《新加坡个人数据保护法》（个人数据 Protection
                Act,
                PDPA）、《新加坡网络安全法》以及其他适用的新加坡数据保护和隐私法律法规要求。作为个人实体运营的服务，我们作为数据控制者承担个人责任。
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              <strong>请您仔细阅读本隐私政策。</strong>
              使用我们的服务即表示您已充分理解并同意我们按照本隐私政策处理您的个人信息。如果您不同意本隐私政策的任何内容，请立即停止使用我们的服务。
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
              href="#interpretation"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              定义与解释
            </a>
            <a
              href="#collecting"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              个人信息的收集与使用
            </a>
            <a
              href="#children"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              未成年人信息保护
            </a>
            <a
              href="#links"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              第三方网站链接
            </a>
            <a
              href="#changes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              隐私政策变更
            </a>
            <a
              href="#contact"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              联系我们
            </a>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Interpretation and Definitions */}
          <section
            id="interpretation"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#interpretation"
                className="transition-colors hover:text-blue-600"
              >
                定义与解释
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  条款解释
                </h3>
                <p className="leading-relaxed text-gray-700">
                  首字母大写的词汇具有以下条件下定义的含义。以下定义无论以单数或复数形式出现，均具有相同含义。
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  定义说明
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  在本隐私政策中，以下术语具有如下含义：
                </p>

                <div className="grid gap-4">
                  <div className="rounded-lg border-l-4 border-blue-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-blue-800">账户（Account）</strong>
                      ： 指为您创建的用于访问我们服务或服务部分功能的唯一账户。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-green-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-green-800">
                        关联方（Affiliate）
                      </strong>
                      ：
                      指控制、被控制或与某一方处于共同控制下的实体，其中"控制"是指拥有50%或以上的股份、股权或其他有权选举董事或其他管理权威的证券。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-purple-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-purple-800">
                        数据控制者（Data Controller）
                      </strong>
                      ：
                      （在本协议中称为"我们"、"运营方"或"数据控制者"）指数字牧民社区运营方，以个人实体身份在新加坡运营。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-orange-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-orange-800">Cookie</strong>：
                      指网站放置在您的计算机、移动设备或任何其他设备上的小文件，包含您在该网站上的浏览历史详情及其他多种用途。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-red-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-red-800">国家（Country）</strong>
                      ： 指新加坡共和国（Singapore）
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-indigo-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-indigo-800">
                        设备（Device）
                      </strong>
                      ：
                      指可以访问服务的任何设备，如计算机、手机或数字平板电脑。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-pink-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-pink-800">
                        个人数据（个人数据）
                      </strong>
                      ： 指与已识别或可识别个人相关的任何信息。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-teal-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-teal-800">服务（Service）</strong>
                      ： 指数字牧民连接平台网站。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-yellow-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-yellow-800">
                        服务提供商（Service Provider）
                      </strong>
                      ：
                      指代表我们团队处理数据的任何自然人或法人。它指的是我们雇用的第三方公司或个人，用于促进服务、代表我们提供服务、执行与服务相关的服务或协助我们分析服务的使用情况。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-cyan-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-cyan-800">
                        第三方社交媒体服务（Third-party Social Media Service）
                      </strong>
                      ：
                      指用户可以通过登录或创建账户来使用服务的任何网站或任何社交网络网站。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-emerald-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-emerald-800">
                        使用数据（Usage Data）
                      </strong>
                      ：
                      指自动收集的数据，由使用服务或从服务基础设施本身产生（例如，页面访问的持续时间）。
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-violet-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-violet-800">
                        网站（Website）
                      </strong>
                      ： 指数字牧民连接平台，可通过{" "}
                      <a
                        href="https://connect.shuzimumin.com"
                        rel="external nofollow noopener"
                        target="_blank"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        https://connect.shuzimumin.com
                      </a>
                      访问
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-slate-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-slate-800">您（You）</strong>：
                      指访问或使用服务的个人，或代表该个人访问或使用服务的公司或其他法律实体（视情况而定）。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* 个人数据的收集与使用 */}
          <section
            id="collecting"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#collecting"
                className="transition-colors hover:text-blue-600"
              >
                个人数据的收集与使用
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  收集的数据类型
                </h3>

                <div className="space-y-6">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                    <h4 className="mb-3 flex items-center text-lg font-semibold text-blue-900">
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      个人数据
                    </h4>
                    <p className="mb-4 leading-relaxed text-blue-800">
                      在使用我们的服务时，我们可能会要求您向我们提供某些可用于联系或识别您的个人身份信息。个人身份信息可能包括但不限于：
                    </p>
                    <div className="grid gap-2">
                      <div className="flex items-center rounded border border-blue-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-blue-700">
                          电子邮件地址
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-blue-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-blue-700">
                          使用数据
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                    <h4 className="mb-3 flex items-center text-lg font-semibold text-green-900">
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      使用数据
                    </h4>
                    <div className="space-y-4 text-green-800">
                      <p className="leading-relaxed">
                        使用数据在使用服务时会自动收集。
                      </p>
                      <p className="leading-relaxed">
                        使用数据可能包括您设备的互联网协议地址（例如IP地址）、浏览器类型、浏览器版本、您访问的我们服务的页面、访问的时间和日期、在这些页面上花费的时间、唯一设备标识符和其他诊断数据等信息。
                      </p>
                      <p className="leading-relaxed">
                        当您通过移动设备访问服务时，我们可能会自动收集某些信息，包括但不限于您使用的移动设备类型、您移动设备的唯一ID、您移动设备的IP地址、您的移动操作系统、您使用的移动互联网浏览器类型、唯一设备标识符和其他诊断数据。
                      </p>
                      <p className="leading-relaxed">
                        我们还可能收集您的浏览器在您访问我们的服务时或当您通过移动设备访问服务时发送的信息。
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-6">
                    <h4 className="mb-3 flex items-center text-lg font-semibold text-purple-900">
                      <svg
                        className="mr-2 h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                        />
                      </svg>
                      第三方社交媒体服务信息
                    </h4>
                    <p className="mb-4 leading-relaxed text-purple-800">
                      我们允许您通过以下第三方社交媒体服务创建账户并登录使用服务：
                    </p>
                    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          Google
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          Facebook
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          Instagram
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          Twitter
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          LinkedIn
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-purple-800">
                      <p className="leading-relaxed">
                        如果您决定通过第三方社交媒体服务注册或以其他方式授予我们访问权限，我们可能会收集与您的第三方社交媒体服务账户已关联的个人数据，例如您的姓名、电子邮件地址、您的活动或与该账户关联的联系人列表。
                      </p>
                      <p className="leading-relaxed">
                        您也可以选择通过您的第三方社交媒体服务账户与我们分享额外信息。如果您选择在注册期间或其他时候提供此类信息和个人数据，即表示您允许我们以符合本隐私政策的方式使用、分享和存储这些信息。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-orange-200 bg-orange-50 p-6">
              <h4 className="mb-3 flex items-center text-lg font-semibold text-orange-900">
                <svg
                  className="mr-2 h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                跟踪技术和Cookie
              </h4>
              <p className="mb-4 leading-relaxed text-orange-800">
                我们使用Cookie和类似的跟踪技术来跟踪我们服务上的活动并存储某些信息。我们使用的跟踪技术包括信标、标签和脚本，用于收集和跟踪信息以及改进和分析我们的服务。我们可能使用的技术包括：
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-orange-200 bg-white p-4">
                  <h5 className="mb-2 font-semibold text-orange-900">
                    Cookie或浏览器Cookie
                  </h5>
                  <p className="text-sm leading-relaxed text-orange-800">
                    Cookie是放置在您设备上的小文件。您可以指示您的浏览器拒绝所有Cookie或在发送Cookie时进行提示。但是，如果您不接受Cookie，您可能无法使用我们服务的某些部分。除非您已调整了浏览器设置以拒绝Cookie，否则我们的服务可能会使用Cookie。
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-white p-4">
                  <h5 className="mb-2 font-semibold text-orange-900">
                    网络信标（Web Beacons）
                  </h5>
                  <p className="text-sm leading-relaxed text-orange-800">
                    我们服务的某些部分和我们的电子邮件可能包含称为网络信标的小型电子文件（也称为透明gif、像素标签和单像素gif），这些文件允许我们（例如）计算访问这些页面或打开电子邮件的用户数量，以及其他相关网站统计信息（例如，记录某个部分的受欢迎程度并验证系统和服务器完整性）。
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-orange-200 bg-white p-4">
                <p className="mb-3 leading-relaxed text-orange-800">
                  Cookie可以是"持久"或"会话"Cookie。持久Cookie在您离线时仍保留在您的个人计算机或移动设备上，而会话Cookie在您关闭网络浏览器后立即被删除。
                </p>
                <p className="mb-4 leading-relaxed text-orange-800">
                  我们出于以下目的使用会话和持久Cookie：
                </p>

                <div className="space-y-4">
                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      必要/基本Cookie
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">类型：</span>会话Cookie
                      </p>
                      <p>
                        <span className="font-medium">管理方：</span>我们
                      </p>
                      <p>
                        <span className="font-medium">目的：</span>
                        这些Cookie对于通过我们的网站为您提供服务以及使您能够使用其某些功能至关重要。它们有助于验证用户身份并防止用户账户的欺诈性使用。没有这些Cookie，您所请求的服务无法提供，我们仅使用这些Cookie向您提供这些服务。
                      </p>
                    </div>
                  </div>

                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      Cookie政策/通知接受Cookie
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">类型：</span>持久Cookie
                      </p>
                      <p>
                        <span className="font-medium">管理方：</span>我们
                      </p>
                      <p>
                        <span className="font-medium">目的：</span>
                        这些Cookie用于识别用户是否已接受在我们网站上使用Cookie。
                      </p>
                    </div>
                  </div>

                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      功能性Cookie
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">类型：</span>持久Cookie
                      </p>
                      <p>
                        <span className="font-medium">管理方：</span>我们
                      </p>
                      <p>
                        <span className="font-medium">目的：</span>
                        这些Cookie允许我们记住您在使用我们网站时所做的选择，例如记住您的登录详细信息或语言偏好。这些Cookie的目的是为您提供更个人化的体验，避免您每次使用我们网站时都必须重新输入您的偏好。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-orange-800">
                有关我们使用的Cookie以及您对Cookie的选择的更多信息，请访问我们的Cookie政策或我们隐私政策的Cookie部分。
              </p>
            </div>
          </section>
          {/* 个人数据的使用 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              个人数据的使用
            </h3>
            <p className="mb-6 leading-relaxed text-gray-700">
              我们可能出于以下目的使用个人数据：
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  1
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900">
                    提供和维护我们的服务
                  </h4>
                  <p className="text-sm text-blue-800">
                    包括监控我们服务的使用情况。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                  2
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-green-900">
                    管理您的账户
                  </h4>
                  <p className="text-sm text-green-800">
                    管理您作为服务用户的注册。您提供的个人数据可以让您访问作为注册用户可用的服务的不同功能。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                  3
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-purple-900">
                    履行合同
                  </h4>
                  <p className="text-sm text-purple-800">
                    开发、合规和履行您已购买的产品、物品或服务的购买合同，或通过服务与我们签订的任何其他合同。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  4
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-orange-900">联系您</h4>
                  <p className="text-sm text-orange-800">
                    通过电子邮件、电话、短信或其他同等形式的电子通信（如移动应用推送通知）联系您，有关更新或与功能、产品或合同服务相关的信息通信，包括安全更新，在必要或合理时实施。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-pink-400 bg-pink-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-semibold text-pink-600">
                  5
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-pink-900">
                    为您提供新闻和优惠
                  </h4>
                  <p className="text-sm text-pink-800">
                    向您提供新闻、特殊优惠和有关我们提供的与您已购买或询问的产品类似的其他商品、服务和事件的一般信息，除非您选择不接收此类信息。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-indigo-400 bg-indigo-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                  6
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-indigo-900">
                    管理您的请求
                  </h4>
                  <p className="text-sm text-indigo-800">
                    处理和管理您对我们的请求。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  7
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-red-900">业务转让</h4>
                  <p className="text-sm text-red-800">
                    我们可能使用您的信息来评估或进行合并、剥离、重组、改组、解散或其他出售或转让我们的部分或全部资产，无论是作为正在进行的关注事项还是作为破产、清算或类似程序的一部分，其中我们持有的有关我们服务用户的个人数据在被转让的资产中。
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-teal-400 bg-teal-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600">
                  8
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-teal-900">其他目的</h4>
                  <p className="text-sm text-teal-800">
                    我们可能将您的信息用于其他目的，如数据分析、识别使用趋势、确定我们推广活动的有效性以及评估和改进我们的服务、产品、服务、营销和您的体验。
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h4 className="mb-4 font-semibold text-gray-800">
                我们可能在以下情况下分享您的个人信息：
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>与服务提供商：</strong>
                    我们可能与服务提供商分享您的个人信息，以监控和分析我们服务的使用情况，联系您。
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>业务转让：</strong>
                    我们可能在与任何合并、出售我们的资产、融资或将我们的全部或部分业务收购给另一家公司的连接中或在谈判期间分享或转让您的个人信息。
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>与合作伙伴：</strong>
                    我们可能与我们的可信任合作伙伴分享您的信息，在这种情况下，我们将要求这些合作伙伴遵守本隐私政策。合作伙伴包括我们密切合作以提供或改进我们服务的其他实体。
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>与商业合作伙伴：</strong>
                    我们可能与我们的商业合作伙伴分享您的信息，以向您提供某些产品、服务或促销活动。
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>与其他用户：</strong>
                    当您与其他用户分享个人信息或在公共区域互动时，此类信息可能被所有用户查看，并可能在外部公开分发。如果您与其他用户互动或通过第三方社交媒体服务注册，您在第三方社交媒体服务上的联系人可能会看到您的姓名、资料、图片和您活动的描述。同样，其他用户将能够查看您活动的描述、与您沟通并查看您的资料。
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    <strong>经您同意：</strong>
                    经您同意，我们可能为任何其他目的披露您的个人信息。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 个人数据的保留 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              个人数据的保留
            </h3>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                我们将仅在本隐私政策规定的目的所需的时间内保留您的个人数据。我们将在必要的范围内保留和使用您的个人数据，以遵守我们的法律义务（例如，如果我们需要保留您的数据以遵守适用法律）、解决争议并执行我们的法律协议和政策。
              </p>

              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="leading-relaxed text-blue-800">
                  我们还将保留使用数据用于内部分析目的。使用数据通常保留较短的时间，除非这些数据用于加强我们服务的安全性或改进功能，或者我们法律上有义务将这些数据保留更长时间。
                </p>
              </div>
            </div>
          </section>

          {/* 个人数据的传输 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              个人数据的传输
            </h3>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                您的信息（包括个人数据）在我们的运营办公室以及参与处理的各方所在的任何其他地方进行处理。这意味着这些信息可能被传输到——并维护在——位于您的州、省、国家或其他政府管辖区以外的计算机上，这些地方的数据保护法律可能与您所在管辖区的法律不同。
              </p>

              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed text-green-800">
                  您对本隐私政策的同意及您随后提交此类信息代表您对该传输的同意。
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="leading-relaxed text-purple-800">
                  我们将采取所有合理必要的步骤，确保您的数据得到安全处理并符合本隐私政策，并且不会向组织或国家转让您的个人数据，除非在适当的控制下（包括您数据和其他个人信息的安全性）。
                </p>
              </div>
            </div>
          </section>

          {/* 删除您的个人数据 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              删除您的个人数据
            </h3>
            <div className="space-y-4">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <h4 className="mb-2 flex items-center font-semibold text-green-900">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  您的权利
                </h4>
                <p className="leading-relaxed text-green-800">
                  您有权删除或请求我们协助删除我们收集的关于您的个人数据。
                </p>
              </div>

              <p className="leading-relaxed text-gray-700">
                我们的服务可能会给您提供从服务内删除有关您的某些信息的能力。
              </p>

              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="leading-relaxed text-blue-800">
                  您可以随时通过登录您的账户（如果您有账户）并访问允许您管理个人信息的账户设置部分来更新、修改或删除您的信息。您也可以联系我们，请求访问、更正或删除您向我们提供的任何个人信息。
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="leading-relaxed font-medium text-yellow-800">
                  但请注意，当我们有法律义务或合法依据时，我们可能需要保留某些信息。
                </p>
              </div>
            </div>
          </section>

          {/* 个人数据的披露 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              个人数据的披露
            </h3>

            <div className="space-y-6">
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <h4 className="mb-2 flex items-center text-lg font-semibold text-red-900">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  业务交易
                </h4>
                <p className="leading-relaxed text-red-800">
                  如果我们参与合并、收购或资产出售，您的个人数据可能会被转让。在您的个人数据被转让并适用不同的隐私政策之前，我们将提供通知。
                </p>
              </div>

              <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                <h4 className="mb-2 flex items-center text-lg font-semibold text-orange-900">
                  <svg
                    className="mr-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l-3-9m3 9l3-9"
                    />
                  </svg>
                  法律执行
                </h4>
                <p className="leading-relaxed text-orange-800">
                  在某些情况下，如果法律要求或为响应公共当局（例如法院或政府机构）的有效请求，我们可能需要披露您的个人数据。
                </p>
              </div>

              <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                <h4 className="mb-3 flex items-center text-lg font-semibold text-purple-900">
                  <svg
                    className="mr-2 h-5 w-5"
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
                  其他法律要求
                </h4>
                <p className="mb-3 leading-relaxed text-purple-800">
                  我们可能本着善意披露您的个人数据，认为此类行动对以下情况必要：
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      遵守法律义务
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      保护和维护我们的权利或财产
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      防止或调查与服务相关的可能不当行为
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      保护服务用户或公众的人身安全
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      防止法律责任
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 个人数据的安全 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              个人数据的安全
            </h3>

            <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-6">
              <div className="mb-3 flex items-center">
                <svg
                  className="mr-2 h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="font-semibold text-red-800">安全提示</span>
              </div>
              <p className="leading-relaxed text-red-800">
                您的个人数据安全对我们很重要，但请记住，通过互联网传输或电子存储的方法都不是100%安全的。虽然我们努力使用商业上可接受的方式来保护您的个人数据，但我们无法保证其绝对安全。
              </p>
            </div>
          </section>
          {/* 未成年人隐私保护 */}
          <section
            id="children"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#children"
                className="transition-colors hover:text-blue-600"
              >
                未成年人隐私保护
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="mb-6 rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
              <div className="mb-3 flex items-center">
                <svg
                  className="mr-2 h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-yellow-800">
                  年龄限制通知
                </h3>
              </div>
              <p className="mb-4 leading-relaxed text-yellow-800">
                我们的服务不面向13岁以下的任何人。我们不会故意收集任何13岁以下人员的个人身份信息。如果您是父母或监护人，并且您知道您的孩子已向我们提供了个人数据，请联系我们。如果我们发现在未经父母同意验证的情况下从13岁以下的任何人那里收集了个人数据，我们会采取措施从我们的服务器中删除该信息。
              </p>
              <p className="leading-relaxed text-yellow-800">
                如果我们需要依靠同意作为处理您信息的法律依据，并且您的国家需要父母的同意，我们可能会在收集和使用该信息之前要求您父母的同意。
              </p>
            </div>
          </section>
          {/* 第三方网站链接 */}
          <section
            id="links"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#links"
                className="transition-colors hover:text-blue-600"
              >
                第三方网站链接
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-4">
              <div className="flex items-start rounded-lg border border-blue-200 bg-blue-50 p-4">
                <svg
                  className="mt-0.5 mr-3 h-6 w-6 flex-shrink-0 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <p className="leading-relaxed text-blue-800">
                  我们的服务可能包含指向不由我们运营的其他网站的链接。如果您点击第三方链接，您将被定向到该第三方的网站。我们强烈建议您查看您访问的每个网站的隐私政策。
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <p className="leading-relaxed font-medium text-orange-800">
                  我们无法控制第三方网站或服务的内容、隐私政策或做法，也不承担任何责任。
                </p>
              </div>
            </div>
          </section>
          {/* 联系我们 */}
          <section
            id="contact"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#contact"
                className="transition-colors hover:text-blue-600"
              >
                联系我们
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-4">
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
                  如果您对本隐私政策有任何疑问，您可以通过以下方式联系我们：
                  <a
                    href="mailto:service@shuzimumin.com"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    service@shuzimumin.com
                  </a>
                  。
                </p>
              </div>
            </div>
          </section>
          {/* 隐私政策变更 */}
          <section
            id="changes"
            className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8"
          >
            <h2 className="group mb-6 flex items-center text-2xl font-bold text-gray-900 md:text-3xl">
              <a
                href="#changes"
                className="transition-colors hover:text-blue-600"
              >
                隐私政策变更
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                我们上次更新本隐私政策的日期为{" "}
                <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-sm">
                  2025-07-27
                </span>
                ，并可能再次更新本隐私政策。我们将在本平台上发布所有更新。对于包含重大变更的更新，如果您创建了帐户并提供了有效的电子邮件地址，我们同意向您发送电子邮件。我们还可能在本平台上通过特殊消息或提醒来宣布更新。
              </p>

              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed font-medium text-green-800">
                  当您注意到本隐私政策的更新后，继续使用我们的服务即表示您接受更新后的隐私政策。
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* 返回顶部 Button */}
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
