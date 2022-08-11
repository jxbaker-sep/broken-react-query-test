<!--

* Please fill out this template with all the relevant information so we can
  understand what's going on and fix the issue. We appreciate bugs filed and PRs
  submitted!

* Please make sure that you are familiar with and follow the Code of Conduct for
  this project (found in the CODE_OF_CONDUCT.md file).

* You can get the installed version of an NPM package by running `npm ls <insert package name>` in your terminal.

-->

- `react-hooks-testing-library` version: n/a, using React 18 and @testing-library/react 13.3
- `react` version: 18.2
- `react-dom` version (if applicable): 18.2
- `react-test-renderer` version (if applicable): n/a
- `node` version: v16.16.0
- `npm` (or `yarn`) version: 8.11.0

### Relevant code or config:

```js
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

test("useIasQuery", async () => {
    function useCustomHook() {
        return useQuery(['customHook'], () => 'Hello');
    }
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );

    const { result } = renderHook(() => useCustomHook(), { wrapper });

    await waitFor(() => result.current.isSuccess, {interval: 100});
    expect(result.current.data).toEqual("Hello");
});
```

### What you did:

I attempted to implement and run the example test for ReactQuery (https://tanstack.com/query/v4/docs/guides/testing), using React 18. Note that react-hooks-testing-library renderHooks has been rolled into @testing-library/react for React 18. Therefore, you will note one change in the above code from the example test provided: instead of using the `waitFor` method returned by renderHook, I am using the `waitFor` method defined in @testing-library/react.

### What happened:

The test fails because `waitFor` times out.

### Reproduction:

`git clone git@github.com:jxbaker-sep/broken-react-query-test.git`
`npm test`

### Problem description:

We would like to write good tests for our ReactQuery app, but are unable to determine how to correctly write those tests with React 18.

### Suggested solution:

Update ReactQuery docs to demonstrate functional testing with React 18.