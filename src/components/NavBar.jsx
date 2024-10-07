import React from "react";

function NavBar() {
  return (
    <div>
      {/* This section will only be visible on small screens (using Tailwind CSS 'sm:hidden') */}
      <div className="sm:hidden">
        {/* Accessible label for the dropdown, hidden visually but available to screen readers */}
        <label htmlFor="Tab" className="sr-only">
          Tab
        </label>

        {/* Dropdown menu for small screens with different options */}
        <select id="Tab" className="w-full rounded-md border-gray-200">
          <option>Settings</option>
          <option>Messages</option>
          <option>Archive</option>
          {/* This option is marked as selected by default */}
          <option select>Notifications</option>
        </select>
      </div>

      {/* This section will be visible on medium and larger screens (using Tailwind CSS 'hidden sm:block') */}
      <div className="hidden sm:block">
        {/* A horizontal navigation bar with tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-6" aria-label="Tabs">
            {/* Each link represents a tab, and they have icons next to their labels */}

            {/* Settings tab */}
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {/* SVG icon for Settings */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                {/* SVG path for a gear (Settings) */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                />
                {/* SVG path for the central gear */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {/* Label for Settings */}
              Settings
            </a>

            {/* Messages tab */}
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {/* SVG icon for Messages */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                {/* SVG path for a message box icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                />
              </svg>
              {/* Label for Messages */}
              Messages
            </a>

            {/* Archive tab */}
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >
              {/* SVG icon for Archive */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                {/* SVG path for archive box icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
              {/* Label for Archive */}
              Archive
            </a>

            {/* Notifications tab, which is currently active (indicated by the blue border and text color) */}
            <a
              href="#"
              className="inline-flex shrink-0 items-center gap-2 border-b-2 border-sky-500 px-1 pb-4 text-sm font-medium text-sky-600"
              aria-current="page"
            >
              {/* SVG icon for Notifications */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-5"
              >
                {/* SVG path for notification bell icon */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 18.75a1.5 1.5 0 01-3 0m-5.405-2.926a7.506 7.506 0 01-.845-3.324V9.75a5.25 5.25 0 0110.5 0v2.75c0 1.146-.296 2.265-.846 3.324l-.477.954a1.125 1.125 0 00-.12.5v.297m-7.616-1.75h8.25"
                />
              </svg>
              {/* Label for Notifications */}
              Notifications
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
