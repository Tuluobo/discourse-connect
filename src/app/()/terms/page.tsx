"use client";

import { useTranslations } from "next-intl";

export default function TermsPage() {
  const t = useTranslations("terms");

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto max-w-6xl px-4 py-8 md:px-8 lg:px-12">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 md:text-3xl">
            {t("title")}
          </h1>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        </div>

        {/* Introduction */}
        <div className="mb-8 rounded-lg border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-4 rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
              <p className="mb-2 font-medium text-blue-800">
                {t("effectiveDate")}
              </p>
              <p className="text-sm text-blue-700">{t("lastUpdated")}</p>
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">
              {t("introduction.welcome")}{" "}
              <a
                href="https://connect.shuzimumin.com"
                className="text-blue-600 underline decoration-blue-300 transition-colors hover:text-blue-800 hover:decoration-blue-500"
              >
                {t("introduction.website")}
              </a>
              {t("introduction.agreement")}
            </p>
            <div className="mb-4 rounded-r-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <h3 className="mb-2 font-bold text-amber-800">
                {t("introduction.legalNotice.title")}
              </h3>
              <p className="text-sm leading-relaxed text-amber-700">
                {t("introduction.legalNotice.content")}
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
              {t("tableOfContents.sections.importantTerms")}
            </a>
            <a
              href="#heading--permission"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.permission")}
            </a>
            <a
              href="#heading--conditions"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.conditions")}
            </a>
            <a
              href="#heading--acceptable-use"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.acceptableUse")}
            </a>
            <a
              href="#heading--content-standards"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.contentStandards")}
            </a>
            <a
              href="#heading--enforcement"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.enforcement")}
            </a>
            <a
              href="#heading--your-account"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.yourAccount")}
            </a>
            <a
              href="#heading--your-content"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.yourContent")}
            </a>
            <a
              href="#heading--responsibility"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.responsibility")}
            </a>
            <a
              href="#heading--disclaimers"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.disclaimers")}
            </a>
            <a
              href="#heading--liability"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.liability")}
            </a>
            <a
              href="#heading--feedback"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.feedback")}
            </a>
            <a
              href="#heading--termination"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.termination")}
            </a>
            <a
              href="#heading--disputes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.disputes")}
            </a>
            <a
              href="#heading--general"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.general")}
            </a>
            <a
              href="#heading--contact"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.contact")}
            </a>
            <a
              href="#heading--changes"
              className="group flex items-center rounded-lg p-3 text-gray-700 transition-all duration-200 hover:bg-white hover:text-blue-600"
            >
              <span className="mr-3 h-2 w-2 rounded-full bg-blue-400 transition-colors group-hover:bg-blue-600"></span>
              {t("tableOfContents.sections.changes")}
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
                <strong>{t("sections.importantTerms.content")}</strong>
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
              {(t.raw("sections.conditions.conditions") as string[]).map(
                (condition: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed">{condition}</p>
                  </li>
                ),
              )}
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
              {(t.raw("sections.acceptableUse.prohibitions") as string[]).map(
                (prohibition: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                      {index + 1}
                    </span>
                    <p className="leading-relaxed">{prohibition}</p>
                  </div>
                ),
              )}
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
              {(
                t.raw("sections.contentStandards.prohibitions") as string[]
              ).map((prohibition: string, index: number) => (
                <div key={index} className="flex items-start">
                  <span className="mt-0.5 mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-600">
                    {index + 1}
                  </span>
                  <p className="leading-relaxed">{prohibition}</p>
                </div>
              ))}
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
                {t("sections.enforcement.rights")}
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
                {t("sections.yourAccount.requirements")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourAccount.creation")}{" "}
                <a
                  href="mailto:service@shuzimumin.com"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  {t("sections.yourAccount.email")}
                </a>{" "}
                {t("sections.yourAccount.responsibility")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourAccount.restrictions")}
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
                {t("sections.yourContent.license")}
              </p>
              <p className="leading-relaxed">
                {t("sections.yourContent.termination")}
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
              {t("sections.responsibility.content")}
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
                  {t("sections.disclaimers.asIs.content")}
                </p>
                <p className="leading-relaxed text-red-700">
                  {t("sections.disclaimers.asIs.disclaimer")}
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.merchantability.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t(
                      "sections.disclaimers.warranties.merchantability.content",
                    )}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.continuity.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.continuity.content")}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.accuracy.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.accuracy.content")}
                  </p>
                </div>
                <div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
                  <h4 className="mb-2 font-semibold text-orange-800">
                    {t("sections.disclaimers.warranties.thirdParty.title")}
                  </h4>
                  <p className="text-sm text-orange-700">
                    {t("sections.disclaimers.warranties.thirdParty.content")}
                  </p>
                </div>
              </div>

              <div className="rounded-r-lg border-l-4 border-gray-400 bg-gray-50 p-4">
                <h3 className="mb-2 font-bold text-gray-800">
                  {t("sections.disclaimers.thirdParty.title")}
                </h3>
                <p className="leading-relaxed text-gray-700">
                  {t("sections.disclaimers.thirdParty.content")}
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
                    {t("sections.liability.indirectDamages.title")}：
                  </strong>
                  {t("sections.liability.indirectDamages.content")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4">
                <p className="leading-relaxed font-semibold text-red-800">
                  <strong>{t("sections.liability.limitation.title")}：</strong>
                  {t("sections.liability.limitation.content")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="mb-3 leading-relaxed font-medium text-blue-800">
                  <strong>{t("sections.liability.important.title")}：</strong>
                  {t("sections.liability.important.content")}
                </p>
              </div>
              <div className="rounded-r-lg border-l-4 border-purple-400 bg-purple-50 p-4">
                <p className="leading-relaxed font-medium text-purple-800">
                  <strong>
                    {t("sections.liability.individualEntity.title")}：
                  </strong>
                  {t("sections.liability.individualEntity.content")}
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
              </p>
              <p className="leading-relaxed">{t("sections.feedback.usage")}</p>
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
                {t("sections.termination.surviving")}
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
                {t("sections.disputes.title")}
              </a>
              <span className="ml-2 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100">
                #
              </span>
            </h2>
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                <strong>{t("sections.disputes.governingLaw")}</strong>
              </p>
              <p className="leading-relaxed">
                {t("sections.disputes.jurisdiction")}
              </p>
              <div className="rounded-r-lg border-l-4 border-gray-400 bg-gray-50 p-4">
                <p className="leading-relaxed font-semibold text-gray-800">
                  {t("sections.disputes.arbitration")}
                </p>
              </div>
              <p className="leading-relaxed">{t("sections.disputes.costs")}</p>
              <div className="mt-4 rounded-r-lg border-l-4 border-orange-400 bg-orange-50 p-4">
                <p className="leading-relaxed font-medium text-orange-800">
                  <strong>
                    {t("sections.disputes.individualEntity.title")}：
                  </strong>
                  {t("sections.disputes.individualEntity.content")}
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
                {t("sections.general.severability")}
              </p>
              <p className="leading-relaxed">
                {t("sections.general.assignment")}
              </p>
              <p className="leading-relaxed">{t("sections.general.waiver")}</p>
              <p className="leading-relaxed">
                {t("sections.general.entireAgreement")}
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
                    {t("sections.contact.email.title")}
                  </span>
                </div>
                <p className="leading-relaxed text-blue-700">
                  {t("sections.contact.email.content")}{" "}
                  <a
                    href="mailto:service@shuzimumin.com"
                    className="font-medium text-blue-600 underline hover:text-blue-800"
                  >
                    {t("sections.contact.email.address")}
                  </a>
                </p>
              </div>
              <p className="leading-relaxed">
                {t("sections.contact.notifications")}
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
                {t("sections.changes.updates")}
              </p>
              <div className="rounded-r-lg border-l-4 border-green-400 bg-green-50 p-4">
                <p className="leading-relaxed font-medium text-green-800">
                  {t("sections.changes.acceptance")}
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
