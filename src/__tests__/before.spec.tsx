import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BeforeUserTable from "@/components/BeforeUserTable";

const user = userEvent.setup();

describe("UserTableフィルタリングテスト", () => {
  beforeEach(() => {
    act(() => {
      render(
        <BeforeUserTable
          initialUsers={[
            {
              id: 1,
              name: "田中さん",
              email: "tanaka@april.biz",
              phone: "1-770-736-8031 x56442",
              website: "hildegard.org",
            },
          ]}
        />,
      );
    });
  });
  test("フィルタリング条件nameのみ_表示テスト", async () => {
    await waitFor(() => {
      expect(screen.queryByText("ローディング中")).not.toBeInTheDocument();
    });
    const conditionField = await screen.findByLabelText("検索条件");
    await user.type(conditionField, "田中さん");
    await waitFor(() => {
      expect(screen.getByText("田中さん")).toBeInTheDocument();
      expect(screen.queryByText("佐々木さん")).toBeNull();
    });
  });
});
