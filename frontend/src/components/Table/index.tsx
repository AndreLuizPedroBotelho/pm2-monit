import React from 'react';
import TableMain from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ActionsTable from '../ActionsTable';
import { Container } from './styles';

interface MethodInterface {
  startFunction(id: number, watch: boolean): Promise<void>;
  stopFunction(id: number): Promise<void>;
  logFunction(id: number): Promise<void>;
  reloadFunction(id: number, watch: boolean): Promise<void>;
  deleteFunction(id: number): Promise<void>;
}

interface TableProps {
  heads: string[];
  headsText: string[];
  rows: any[];
  methods: MethodInterface;
}

const Table: React.FC<TableProps> = ({ heads, headsText, rows, methods }) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <TableMain stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headsText.map((headText) => (
                <TableCell align="center">{headText}</TableCell>
              ))}
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                {heads.map((head) => (
                  <TableCell align="center">{row[head]}</TableCell>
                ))}
                <TableCell align="center" size="small">
                  <ActionsTable
                    methods={methods}
                    id={row.id}
                    watchStatus={row.watchStatus}
                    statusProcess={row.statusProcess}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMain>
      </TableContainer>
    </Container>
  );
};

export default Table;
