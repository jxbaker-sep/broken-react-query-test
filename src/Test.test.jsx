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