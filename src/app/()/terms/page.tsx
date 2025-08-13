import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("termsOfService");

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
              {t("introduction.welcome")}{" "}
              <a
                href="https://connect.shuzimumin.com"
                className="text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-800 hover:decoration-blue-500"
              >
                {t("introduction.websiteUrl")}
              </a>
              {t("introduction.agreement")}
            </p>
            <div className="mb-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <h3 className="mb-2 font-bold text-amber-800">
                {t("introduction.legalNotice.title")}
              </h3>
              <p className="text-sm leading-relaxed text-amber-700">
                {t("introduction.legalNotice.text")}
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              {t("introduction.readCarefully")}
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
              href="#heading--important-terms"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.importantTerms")}
            </a>
            <a
              href="#heading--permission"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.permission")}
            </a>
            <a
              href="#heading--conditions"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.conditions")}
            </a>
            <a
              href="#heading--acceptable-use"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.acceptableUse")}
            </a>
            <a
              href="#heading--content-standards"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.contentStandards")}
            </a>
            <a
              href="#heading--enforcement"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.enforcement")}
            </a>
            <a
              href="#heading--your-account"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.yourAccount")}
            </a>
            <a
              href="#heading--your-content"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.yourContent")}
            </a>
            <a
              href="#heading--responsibility"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.responsibility")}
            </a>
            <a
              href="#heading--disclaimers"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.disclaimers")}
            </a>
            <a
              href="#heading--liability"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.liability")}
            </a>
            <a
              href="#heading--feedback"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.feedback")}
            </a>
            <a
              href="#heading--termination"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.termination")}
            </a>
            <a
              href="#heading--disputes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.disputes")}
            </a>
            <a
              href="#heading--general"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.general")}
            </a>
            <a
              href="#heading--contact"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.contact")}
            </a>
            <a
              href="#heading--changes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.items.changes")}
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
                {t("sections.importantTerms.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <p className="leading-relaxed text-amber-800">
                <strong>
                  {t("sections.importantTerms.content")}
                  <a
                    href="#heading--disclaimers"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    {t("sections.importantTerms.disclaimer")}
                  </a>
                  {t("sections.importantTerms.disclaimerText")}
                  <a
                    href="#heading--liability"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    {t("sections.importantTerms.liabilityLimit")}
                  </a>
                  {t("sections.importantTerms.liabilityText")}
                  <a
                    href="#heading--responsibility"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    {t("sections.importantTerms.responsibility")}
                  </a>
                  {t("sections.importantTerms.responsibilityText")}
                  <a
                    href="#heading--disputes"
                    className="text-amber-700 underline hover:text-amber-900"
                  >
                    {t("sections.importantTerms.disputes")}
                  </a>
                  {t("sections.importantTerms.disputesText")}
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
                {t("sections.permission.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="leading-relaxed text-gray-700">
              {t("sections.permission.content")}
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
                {t("sections.conditions.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              {t("sections.conditions.intro")}
            </p>
            <ol className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  1
                </span>
                <p className="leading-relaxed">
                  {t("sections.conditions.condition1")}
                </p>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  2
                </span>
                <p className="leading-relaxed">
                  {t("sections.conditions.condition2")}
                </p>
              </li>
              <li className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                  3
                </span>
                <p className="leading-relaxed">
                  {t("sections.conditions.condition3")}
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
                {t("sections.acceptableUse.title")}
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
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule1")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  2
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule2")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  3
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule3")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  4
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule4")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  5
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule5")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  6
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule6")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  7
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule7")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  8
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule8")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  9
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule9")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  10
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule10")}{" "}
                  <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                    &lt;iframe&gt;
                  </code>{" "}
                  {t("sections.acceptableUse.rule10Cont")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  11
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule11")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  12
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule12")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  13
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule13")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  14
                </span>
                <p className="leading-relaxed">
                  {t("sections.acceptableUse.rule14")}
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
                {t("sections.contentStandards.title")}
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
                  {t("sections.contentStandards.standard1")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  2
                </span>
                <p className="leading-relaxed">
                  {t("sections.contentStandards.standard2")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  3
                </span>
                <p className="leading-relaxed">
                  {t("sections.contentStandards.standard3")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  4
                </span>
                <p className="leading-relaxed">
                  {t("sections.contentStandards.standard4")}
                </p>
              </div>
              <div className="flex items-start">
                <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                  5
                </span>
                <p className="leading-relaxed">
                  {t("sections.contentStandards.standard5")}
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
                {t("sections.enforcement.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.enforcement.investigation")}
              </p>
              <p className="leading-relaxed">
                {t("sections.enforcement.moderation")}
                <a
                  href="#heading--contact"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.enforcement.contactUs")}
                </a>
                {t("sections.enforcement.period")}
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
                {t("sections.yourAccount.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.yourAccount.required")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourAccount.createAccount")}{" "}
                <a
                  href="mailto:service@shuzimumin.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.yourAccount.email")}
                </a>{" "}
                {t("sections.yourAccount.closeAccount")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourAccount.responsibility")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourAccount.suspension")}
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
                {t("sections.yourContent.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.yourContent.ownership")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourContent.responsibility")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourContent.permissions")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourContent.termination")}
                <a
                  href="https://creativecommons.org"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.yourContent.creativeCommons")}
                </a>
                {t("sections.yourContent.terminationCont")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourContent.violations")}
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
                {t("sections.responsibility.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <p className="leading-relaxed text-gray-700">
              {t("sections.responsibility.indemnity")}
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
                {t("sections.disclaimers.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                <h3 className="mb-3 font-bold text-red-800">
                  {t("sections.disclaimers.asIs.title")}
                </h3>
                <p className="mb-3 leading-relaxed font-semibold text-red-800">
                  {t("sections.disclaimers.asIs.text")}
                </p>
                <p className="leading-relaxed text-red-700">
                  {t("sections.disclaimers.asIs.noWarranty")}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.merchantability.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.merchantability.text")}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.continuity.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.continuity.text")}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.accuracy.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.accuracy.text")}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.thirdParty.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.thirdParty.text")}
                  </p>
                </div>
              </div>

              <div className="rounded-r-lg border-l-4 border-gray-400 bg-gray-50 p-4">
                <h3 className="mb-2 font-bold text-gray-800">
                  {t("sections.disclaimers.thirdPartyServices.title")}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {t("sections.disclaimers.thirdPartyServices.text")}
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
                {t("sections.liability.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="leading-relaxed font-semibold text-yellow-800">
                  <strong>
                    {t("sections.liability.indirectDamages.title")}
                  </strong>
                  {t("sections.liability.indirectDamages.text")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="leading-relaxed font-semibold text-red-800">
                  <strong>{t("sections.liability.limitation.title")}</strong>
                  {t("sections.liability.limitation.text")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="mb-3 leading-relaxed font-medium text-blue-800">
                  <strong>{t("sections.liability.important.title")}</strong>
                  {t("sections.liability.important.text")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="leading-relaxed font-medium text-purple-800">
                  <strong>
                    {t("sections.liability.personalEntity.title")}
                  </strong>
                  {t("sections.liability.personalEntity.text")}
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
                {t("sections.feedback.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.feedback.welcome")}
                <a
                  href="#heading--contact"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.feedback.contact")}
                </a>
                {t("sections.feedback.section")}
              </p>
              <p className="leading-relaxed">{t("sections.feedback.rights")}</p>
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
                {t("sections.termination.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.termination.termination")}
              </p>
              <p className="leading-relaxed">
                {t("sections.termination.survivingTerms")}
                <a
                  href="#heading--your-content"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.yourContent")}
                </a>
                、
                <a
                  href="#heading--feedback"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.feedback")}
                </a>
                、
                <a
                  href="#heading--responsibility"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.responsibility")}
                </a>
                、
                <a
                  href="#heading--disclaimers"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.disclaimers")}
                </a>
                、
                <a
                  href="#heading--liability"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.liability")}
                </a>
                {t("sections.termination.and")}
                <a
                  href="#heading--general"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.termination.general")}
                </a>
                {t("sections.termination.period")}
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
                {t("sections.general.title")}
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
                {t("sections.contact.title")}
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
                  <span className="font-semibold text-blue-800">
                    {t("sections.contact.emailTitle")}
                  </span>
                </div>
                <p className="leading-relaxed text-blue-700">
                  {t("sections.contact.email")}
                  <a
                    href="mailto:service@shuzimumin.com"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    {t("sections.contact.emailAddress")}
                  </a>
                  {t("sections.contact.period")}
                </p>
              </div>
              <p className="leading-relaxed">
                {t("sections.contact.notification")}
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
                {t("sections.changes.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {t("sections.changes.lastUpdate")}{" "}
                <span className="rounded bg-yellow-100 px-2 py-1 font-mono text-sm">
                  {t("sections.changes.date")}
                </span>
                {t("sections.changes.updatePolicy")}
              </p>
              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed font-medium text-green-800">
                  {t("sections.changes.agreement")}
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
            {t("backToTop")}
          </a>
        </div>
      </div>
    </div>
  );
}
