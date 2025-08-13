import { useTranslations } from "next-intl";

export default function PrivacyPolicyPage() {
  const t = useTranslations("privacyPolicy");

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
            {t("header.title")}
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>

        {/* Introduction */}
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-4 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="mb-2 font-medium text-blue-800">
                {t("header.effectiveDate")}
              </p>
              <p className="text-sm text-blue-700">{t("header.lastUpdated")}</p>
            </div>

            <p className="mb-4 leading-relaxed text-gray-700">
              <strong> {t("header.introduction.title")}</strong>
              {t("header.introduction.text")}
            </p>
            <div className="mb-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <h3 className="mb-2 font-bold text-amber-800">
                {t("header.introduction.importantNotice.title")}
              </h3>
              <p className="text-sm leading-relaxed text-amber-700">
                {t("header.introduction.importantNotice.text")}
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              <strong>{t("header.introduction.readCarefully.title")}</strong>
              {t("header.introduction.readCarefully.text")}
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
            {t("tableOfContents.title")}
          </h3>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <a
              href="#interpretation"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.interpretation")}
            </a>
            <a
              href="#collecting"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.collecting")}
            </a>
            <a
              href="#children"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.children")}{" "}
            </a>
            <a
              href="#links"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.links")}
            </a>
            <a
              href="#changes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.changes")}
            </a>
            <a
              href="#contact"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.contact")}
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
                {t("sections.interpretation.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-xl font-semibold text-gray-800">
                  {t("sections.interpretation.interpretation.title")}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {t("sections.interpretation.interpretation.text")}
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  {t("sections.interpretation.definitions.title")}
                </h3>
                <p className="mb-4 leading-relaxed text-gray-700">
                  {t("sections.interpretation.definitions.intro")}
                </p>

                <div className="grid gap-4">
                  <div className="rounded-lg border-l-4 border-blue-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-blue-800">
                        {t("sections.interpretation.definitions.account.title")}
                      </strong>
                      ： {t("sections.interpretation.definitions.account.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-green-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-green-800">
                        {t(
                          "sections.interpretation.definitions.affiliate.title",
                        )}
                      </strong>
                      ：
                      {t("sections.interpretation.definitions.affiliate.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-purple-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-purple-800">
                        {t(
                          "sections.interpretation.definitions.dataController.title",
                        )}
                      </strong>
                      ：
                      {t(
                        "sections.interpretation.definitions.dataController.text",
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-orange-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-orange-800">
                        {t("sections.interpretation.definitions.cookie.title")}
                      </strong>
                      ：{t("sections.interpretation.definitions.cookie.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-red-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-red-800">
                        {t("sections.interpretation.definitions.country.title")}
                      </strong>
                      ： {t("sections.interpretation.definitions.country.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-indigo-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-indigo-800">
                        {t("sections.interpretation.definitions.device.title")}
                      </strong>
                      ：{t("sections.interpretation.definitions.device.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-pink-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-pink-800">
                        {t(
                          "sections.interpretation.definitions.personalData.title",
                        )}
                      </strong>
                      ：{" "}
                      {t(
                        "sections.interpretation.definitions.personalData.text",
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-teal-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-teal-800">
                        {t("sections.interpretation.definitions.service.title")}
                      </strong>
                      ： {t("sections.interpretation.definitions.service.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-yellow-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-yellow-800">
                        {t(
                          "sections.interpretation.definitions.serviceProvider.title",
                        )}
                      </strong>
                      ：
                      {t(
                        "sections.interpretation.definitions.serviceProvider.text",
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-cyan-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-cyan-800">
                        {t(
                          "sections.interpretation.definitions.thirdPartySocial.title",
                        )}
                      </strong>
                      ：
                      {t(
                        "sections.interpretation.definitions.thirdPartySocial.text",
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-emerald-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-emerald-800">
                        {t(
                          "sections.interpretation.definitions.usageData.title",
                        )}
                      </strong>
                      ：
                      {t("sections.interpretation.definitions.usageData.text")}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-violet-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-violet-800">
                        {t("sections.interpretation.definitions.website.title")}
                      </strong>
                      ： {t("sections.interpretation.definitions.website.text")}{" "}
                      <a
                        href={t(
                          "sections.interpretation.definitions.website.url",
                        )}
                        rel="external nofollow noopener"
                        target="_blank"
                        className="text-blue-600 underline hover:text-blue-800"
                      >
                        {t("sections.interpretation.definitions.website.url")}
                      </a>
                      {t(
                        "sections.interpretation.definitions.website.urlSuffix",
                      )}
                    </p>
                  </div>

                  <div className="rounded-lg border-l-4 border-slate-400 bg-gray-50 p-4">
                    <p className="leading-relaxed text-gray-700">
                      <strong className="text-slate-800">
                        {t("sections.interpretation.definitions.you.title")}
                      </strong>
                      ：{t("sections.interpretation.definitions.you.text")}
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
                {t("sections.collecting.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xl font-semibold text-gray-800">
                  {t("sections.collecting.dataTypes.title")}
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
                      {t("sections.collecting.dataTypes.personalData.title")}
                    </h4>
                    <p className="mb-4 leading-relaxed text-blue-800">
                      {t("sections.collecting.dataTypes.personalData.intro")}
                    </p>
                    <div className="grid gap-2">
                      <div className="flex items-center rounded border border-blue-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-blue-700">
                          {t(
                            "sections.collecting.dataTypes.personalData.email",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-blue-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-blue-500"></span>
                        <span className="font-medium text-blue-700">
                          {t(
                            "sections.collecting.dataTypes.personalData.usageData",
                          )}
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
                      {t(
                        "sections.collecting.dataTypes.usageDataSection.title",
                      )}
                    </h4>
                    <div className="space-y-4 text-green-800">
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.usageDataSection.text1",
                        )}
                      </p>
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.usageDataSection.text2",
                        )}
                      </p>
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.usageDataSection.text3",
                        )}
                      </p>
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.usageDataSection.text4",
                        )}
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
                      {t(
                        "sections.collecting.dataTypes.thirdPartySocial.title",
                      )}
                    </h4>
                    <p className="mb-4 leading-relaxed text-purple-800">
                      {t(
                        "sections.collecting.dataTypes.thirdPartySocial.intro",
                      )}
                    </p>
                    <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          {t(
                            "sections.collecting.dataTypes.thirdPartySocial.providers.google",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          {t(
                            "sections.collecting.dataTypes.thirdPartySocial.providers.facebook",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          {t(
                            "sections.collecting.dataTypes.thirdPartySocial.providers.instagram",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          {t(
                            "sections.collecting.dataTypes.thirdPartySocial.providers.twitter",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center rounded border border-purple-200 bg-white p-3">
                        <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                        <span className="font-medium text-purple-700">
                          {t(
                            "sections.collecting.dataTypes.thirdPartySocial.providers.linkedin",
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3 text-purple-800">
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.thirdPartySocial.text1",
                        )}
                      </p>
                      <p className="leading-relaxed">
                        {t(
                          "sections.collecting.dataTypes.thirdPartySocial.text2",
                        )}
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
                {t("sections.collecting.trackingTechnologies.title")}
              </h4>
              <p className="mb-4 leading-relaxed text-orange-800">
                {t("sections.collecting.trackingTechnologies.intro")}
              </p>

              <div className="space-y-4">
                <div className="rounded-lg border border-orange-200 bg-white p-4">
                  <h5 className="mb-2 font-semibold text-orange-900">
                    {t(
                      "sections.collecting.trackingTechnologies.cookieTypes.browserCookie.title",
                    )}
                  </h5>
                  <p className="text-sm leading-relaxed text-orange-800">
                    {t(
                      "sections.collecting.trackingTechnologies.cookieTypes.browserCookie.text",
                    )}
                  </p>
                </div>

                <div className="rounded-lg border border-orange-200 bg-white p-4">
                  <h5 className="mb-2 font-semibold text-orange-900">
                    {t(
                      "sections.collecting.trackingTechnologies.cookieTypes.webBeacons.title",
                    )}
                  </h5>
                  <p className="text-sm leading-relaxed text-orange-800">
                    {t(
                      "sections.collecting.trackingTechnologies.cookieTypes.webBeacons.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-orange-200 bg-white p-4">
                <p className="mb-3 leading-relaxed text-orange-800">
                  {t(
                    "sections.collecting.trackingTechnologies.cookieExplanation",
                  )}
                </p>
                <p className="mb-4 leading-relaxed text-orange-800">
                  {t("sections.collecting.trackingTechnologies.purposes")}
                </p>

                <div className="space-y-4">
                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      {t(
                        "sections.collecting.trackingTechnologies.cookiePurposesDetail.necessary.title",
                      )}
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.type",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.necessary.type",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.manager",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.necessary.manager",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.purpose",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.necessary.purpose",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      {t(
                        "sections.collecting.trackingTechnologies.cookiePurposesDetail.acceptance.title",
                      )}
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.type",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.acceptance.type",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.manager",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.acceptance.manager",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.purpose",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.acceptance.purpose",
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded bg-orange-50 p-3">
                    <h6 className="mb-1 font-semibold text-orange-900">
                      {t(
                        "sections.collecting.trackingTechnologies.cookiePurposesDetail.functionality.title",
                      )}
                    </h6>
                    <div className="space-y-1 text-sm text-orange-700">
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.type",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.functionality.type",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.manager",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.functionality.manager",
                        )}
                      </p>
                      <p>
                        <span className="font-medium">
                          {t(
                            "sections.collecting.trackingTechnologies.labels.purpose",
                          )}
                        </span>
                        {t(
                          "sections.collecting.trackingTechnologies.cookiePurposesDetail.functionality.purpose",
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-orange-800">
                {t("sections.collecting.trackingTechnologies.moreInfoDetail")}
              </p>
            </div>
          </section>
          {/* 个人数据的使用 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.useOfPersonalData.title")}
            </h3>
            <p className="mb-6 leading-relaxed text-gray-700">
              {t("sections.collecting.useOfPersonalData.intro")}
            </p>

            <div className="mb-8 space-y-4">
              <div className="flex items-start rounded-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  1
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-blue-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.provide.title",
                    )}
                  </h4>
                  <p className="text-sm text-blue-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.provide.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-green-400 bg-green-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-semibold text-green-600">
                  2
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-green-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.manage.title",
                    )}
                  </h4>
                  <p className="text-sm text-green-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.manage.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-semibold text-purple-600">
                  3
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-purple-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.contract.title",
                    )}
                  </h4>
                  <p className="text-sm text-purple-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.contract.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  4
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-orange-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.contact.title",
                    )}
                  </h4>
                  <p className="text-sm text-orange-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.contact.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-pink-400 bg-pink-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-semibold text-pink-600">
                  5
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-pink-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.news.title",
                    )}
                  </h4>
                  <p className="text-sm text-pink-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.news.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-indigo-400 bg-indigo-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                  6
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-indigo-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.requests.title",
                    )}
                  </h4>
                  <p className="text-sm text-indigo-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.requests.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-red-400 bg-red-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  7
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-red-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.transfer.title",
                    )}
                  </h4>
                  <p className="text-sm text-red-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.transfer.text",
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start rounded-lg border-l-4 border-teal-400 bg-teal-50 p-4">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-teal-100 text-sm font-semibold text-teal-600">
                  8
                </span>
                <div>
                  <h4 className="mb-1 font-semibold text-teal-900">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.other.title",
                    )}
                  </h4>
                  <p className="text-sm text-teal-800">
                    {t(
                      "sections.collecting.useOfPersonalData.purposes.other.text",
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h4 className="mb-4 font-semibold text-gray-800">
                {t("sections.collecting.useOfPersonalData.sharing.title")}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.providers",
                    )}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.businessTransfer",
                    )}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.affiliates",
                    )}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.businessPartners",
                    )}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.otherUsers",
                    )}
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="mt-2 mr-3 h-2 w-2 rounded-full bg-gray-500"></span>
                  <p className="text-sm text-gray-700">
                    {t(
                      "sections.collecting.useOfPersonalData.sharing.withConsent",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 个人数据的保留 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.retention.title")}
            </h3>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                {t("sections.collecting.retention.text1")}
              </p>

              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="leading-relaxed text-blue-800">
                  {t("sections.collecting.retention.text2")}
                </p>
              </div>
            </div>
          </section>

          {/* 个人数据的传输 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.transfer.title")}
            </h3>
            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                {t("sections.collecting.transfer.text1")}
              </p>

              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed text-green-800">
                  {t("sections.collecting.transfer.text2")}
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="leading-relaxed text-purple-800">
                  {t("sections.collecting.transfer.text3")}
                </p>
              </div>
            </div>
          </section>

          {/* 删除您的个人数据 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.deletion.title")}
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
                  {t("sections.collecting.deletion.rights.title")}
                </h4>
                <p className="leading-relaxed text-green-800">
                  {t("sections.collecting.deletion.rights.text")}
                </p>
              </div>

              <p className="leading-relaxed text-gray-700">
                {t("sections.collecting.deletion.text1")}
              </p>

              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="leading-relaxed text-blue-800">
                  {t("sections.collecting.deletion.text2")}
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="leading-relaxed font-medium text-yellow-800">
                  {t("sections.collecting.deletion.text3")}
                </p>
              </div>
            </div>
          </section>

          {/* 个人数据的披露 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.disclosure.title")}
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
                  {t(
                    "sections.collecting.disclosure.businessTransaction.title",
                  )}
                </h4>
                <p className="leading-relaxed text-red-800">
                  {t("sections.collecting.disclosure.businessTransaction.text")}
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
                  {t("sections.collecting.disclosure.lawEnforcement.title")}
                </h4>
                <p className="leading-relaxed text-orange-800">
                  {t("sections.collecting.disclosure.lawEnforcement.text")}
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
                  {t("sections.collecting.disclosure.legalRequirements.title")}
                </h4>
                <p className="mb-3 leading-relaxed text-purple-800">
                  {t("sections.collecting.disclosure.legalRequirements.intro")}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      {t(
                        "sections.collecting.disclosure.legalRequirements.comply",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      {t(
                        "sections.collecting.disclosure.legalRequirements.protect",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      {t(
                        "sections.collecting.disclosure.legalRequirements.prevent",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      {t(
                        "sections.collecting.disclosure.legalRequirements.safety",
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-3 h-2 w-2 rounded-full bg-purple-500"></span>
                    <span className="text-sm text-purple-700">
                      {t(
                        "sections.collecting.disclosure.legalRequirements.liability",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 个人数据的安全 */}
          <section className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              {t("sections.collecting.security.title")}
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
                <span className="font-semibold text-red-800">
                  {t("sections.collecting.security.notice")}
                </span>
              </div>
              <p className="leading-relaxed text-red-800">
                {t("sections.collecting.security.text")}
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
                {t("sections.children.title")}
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
                  {t("sections.children.notice.title")}
                </h3>
              </div>
              <p className="mb-4 leading-relaxed text-yellow-800">
                {t("sections.children.notice.text1")}
              </p>
              <p className="leading-relaxed text-yellow-800">
                {t("sections.children.notice.text2")}
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
                {t("sections.links.title")}
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
                  {t("sections.links.text1")}
                </p>
              </div>

              <div className="rounded-r-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <p className="leading-relaxed font-medium text-orange-800">
                  {t("sections.links.text2")}
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
                {t("sections.contact.title")}
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
                  <span className="font-semibold text-blue-800">
                    {t("sections.contact.emailTitle")}
                  </span>
                </div>
                <p className="leading-relaxed text-blue-700">
                  {t("sections.contact.text")}
                  <a
                    href={`mailto:${t("sections.contact.email")}`}
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    {t("sections.contact.email")}
                  </a>
                  {t("sections.contact.period")}
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
                {t("sections.changes.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>

            <div className="space-y-4">
              <p className="leading-relaxed text-gray-700">
                {t("sections.changes.text1")}{" "}
                <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-sm">
                  {t("sections.changes.date")}
                </span>
                {t("sections.changes.text2")}
              </p>

              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed font-medium text-green-800">
                  {t("sections.changes.acceptance")}
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
            {t("backToTop")}
          </a>
        </div>
      </div>
    </div>
  );
}
