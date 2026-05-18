import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow
} from "@pds/react";

import { Stack } from "../stories/StoryFrame";
import type { ComponentPreview } from "./types";

const preview = {
  description: "Responsive tabular data with caption, header, and compact density.",
  group: "Layout and data",
  id: "table",
  name: "Table",
  Preview() {
    return (
      <Stack>
        <TableContainer className="visual-lab-table-wrap">
          <Table>
            <TableCaption>Latest generated artifacts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Artifact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Review summary</TableCell>
                <TableCell>Ready</TableCell>
                <TableCell>Agent</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Implementation notes</TableCell>
                <TableCell>Queued</TableCell>
                <TableCell>Reviewer</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer className="visual-lab-table-wrap">
          <Table density="compact">
            <TableBody>
              <TableRow>
                <TableCell>Compact artifact</TableCell>
                <TableCell>Archived</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    );
  }
} satisfies ComponentPreview;

export default preview;
