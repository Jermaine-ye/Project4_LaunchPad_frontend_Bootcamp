import React from 'react';
import axios from 'axios';
import {
  createStyles,
  Text,
  Avatar,
  Group,
  TypographyStylesProvider,
  Paper,
  Menu,
  ActionIcon,
} from '@mantine/core';
import { openModal } from '@mantine/modals';
import { openConfirmModal } from '@mantine/modals';
import { IconPencil, IconTrash, IconDots } from '@tabler/icons';
import { BACKEND_URL } from '../constants';
import EditPost from './EditPost';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 0,
    paddingTop: theme.spacing.sm,
  },
  card: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'visible',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,
    height: 170,

    // '&:hover': {
    //   boxShadow: theme.shadows.md,
    //   transform: 'scale(1.02)',
    // },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
}));

export function PostBlock(props) {
  const { classes } = useStyles();

  const handleEdit = (post) => {
    openModal({
      modalId: 'edit',
      size: 'auto',
      overflow: 'auto',
      children: <EditPost post={post} />,
    });
  };

  const handleDelete = async (id) => {
    openConfirmModal({
      title: 'Confirm deleting this post?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Cancel'),
      onConfirm: async () => {
        try {
          await axios.delete(`${BACKEND_URL}/posts/${id}`);
          props.onPostDelete(id);
          showNotification({
            message: 'Post deleted!',
            color: 'red',
          });
          console.log('post successfully deleted.');
        } catch (error) {
          showNotification({
            message: error.message,
            color: 'red',
          });
        }
      },
    });
  };

  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Group>
          <Avatar
            src={props.post.authorImage}
            alt={props.post.authorName}
            radius="xl"
            size="lg"
          />
          <div>
            <Text size="sm">{props.post.authorName}</Text>
            <Text size="xs" color="dimmed">
              {props.post.createdAt}
            </Text>
          </div>
        </Group>
        {props.cadet.id === props.post.author ? (
          <Group>
            <Menu transition="pop" withArrow>
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={16} stroke={1.5} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconPencil size={16} stroke={1.5} />}
                  onClick={() => handleEdit(props.post)}
                >
                  Edit message
                </Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={16} stroke={1.5} />}
                  color="red"
                  onClick={() => handleDelete(props.post.id)}
                >
                  Delete message
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        ) : null}
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div dangerouslySetInnerHTML={{ __html: props.post.content }} />
      </TypographyStylesProvider>
    </Paper>
  );
}
