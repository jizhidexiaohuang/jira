import { useDocumentTitle } from "../../utils/index";
import { useKanbans } from "../../utils/kanban";
import { useProjectInUrl } from "./util";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { useKanbanSearchParams } from "./util";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";

export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`;
