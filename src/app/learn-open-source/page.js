export default function LearnOpenSource() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-10 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Learn Open Source</h1>
      <p className="text-lg mb-8">
        Join us in our mission to make open source accessible to everyone.
      </p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Join Now
      </button>
      <div className="mt-8 text-center">
        <p className="text-sm">
          Already a member?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
        <p className="text-sm">
          New here?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
