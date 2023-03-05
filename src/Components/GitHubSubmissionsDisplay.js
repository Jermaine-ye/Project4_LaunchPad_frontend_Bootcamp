import { useState } from 'react';
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  Paper,
} from '@mantine/core';
import { IconSelector, IconChevronDown, IconChevronUp } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));

function Th({ children, reversed, sorted, onSort }) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function sortData(data, payload) {
  console.log(data);
  console.log(payload);
  console.log('sortby', payload.sortBy);
  if (!payload.sortBy) {
    return data;
  }

  return [...data].sort((a, b) => {
    console.log(a['cadet']['name']);
    if (payload.reversed) {
      return b[payload.sortBy]['name'].localeCompare(a[payload.sortBy]['name']);
    }

    return a[payload.sortBy]['name'].localeCompare(b[payload.sortBy]['name']);
  });
}

export default function GitHubSubmissionsDisplay({ data }) {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);
  const { classes } = useStyles();

  const setSorting = (field) => {
    console.log(field);
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{row.cadet.name}</td>
      <td>{row.chapter.name}</td>
      <td>{row.repoUrl}</td>
    </tr>
  ));

  return (
    <Paper className="chapter-progress-list">
      <ScrollArea>
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          sx={{ tableLayout: 'fixed', minWidth: 700 }}
        >
          <thead>
            <tr>
              <Th
                sorted={sortBy === 'cadet'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('cadet')}
              >
                Cadet
              </Th>
              <Th
                sorted={sortBy === 'chapter'}
                reversed={reverseSortDirection}
                onSort={() => setSorting('chapter')}
              >
                Chapter
              </Th>

              <th className={classes.th}>
                <Group position="apart">
                  <Text weight={500} size="sm">
                    Repo Url
                  </Text>
                  <Center className={classes.icon}></Center>
                </Group>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={Object.keys(data[0]).length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </Paper>
  );
}
