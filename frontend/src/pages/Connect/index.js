export default function Connect() {
    return (
      <div className="mt-20 justify-between font-inter font-serif items-center">
        <div className="max-w-2xl border border-slate-200 rounded-xl mx-auto shadow-md font-inter p-5">
          <form action="">
            <label htmlFor="email">
              <span
                className="block my-4 font-semibold mb-1 text-slate-700 after:content-['*'] after:text-pink-500 after:ml-0.5">Email
              </span>
              <input id="email" type="email" placeholder="Your email.."
                className="my-4 px-3 py-2 border shadow rounded w-full block text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:bg-slate-50 focus:border-slate-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer">
              </input>
              <p className="text-sm m-1 text-pink-700 invisible peer-invalid:visible">Email invalid</p>
            </label>
          </form>
          <button
            className="bg-gray-400 px-5 py-2 rounded-full text-white font-semibold font-inter block hover:bg-slate-500 active:bg-slate-600 focus:ring focus:bg-slate-600 mx-auto dark:bg-slate-300 dark:text-slate-800 dark:hover:text-slate-900 dark:hover:bg-slate-100">
          提交
        </button>
        </div>

      </div>
    )
  }