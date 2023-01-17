exports.StatusCode = Object.freeze({
	/**
	 * 200 | The request was successfully completed.
	 */
	SUCCESS: 200,

	/**
	 * 201 | A new resource was successfully created.
	 */
	CREATED: 201,

	/**
	 * 204 | The server successfully processed the request, but is not returning any content.
	 */
	NO_CONTENT: 204,

	/**
	 * 304 | Used for conditional GET calls to reduce band-width usage.
	 * If used, must set the Date, Content-Location, ETag headers to what they would have been on a regular GET call.
	 */
	NOT_MODIFIED: 304,

	/**
	 * 400 | The request was invalid.
	 */
	BAD_REQUEST: 400,

	/**
	 * 401 | The request did not include an authentication token or the authentication token was expired.
	 */
	UNAUTHORIZED: 401,

	/**
	 * 403 | The client did not have permission to access the requested resource.
	 */
	FORBIDDEN: 403,

	/**
	 * 404 | The requested resource was not found.
	 */
	NOT_FOUND: 404,

	/**
	 * The HTTP method in the request was not supported by the resource. For example, the DELETE method cannot be used with the Agent API.
	 */
	METHOD_NOT_ALLOWED: 405,

	/**
	 * 409 | The request could not be completed due to a conflict. For example,
	 * POST ContentStore Folder API cannot complete if the given file or folder name already exists in the parent location.
	 */
	CONFLICT: 409,

	/**
	 * 500 | The request was not completed due to an internal error on the server side.
	 */
	INTERNAL_SERVER_ERROR: 500,

	/**
	 * 503 | The server was unavailable.
	 */
	SERVICE_UNAVAILABLE: 503,
});
