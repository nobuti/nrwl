import React, { useCallback, useMemo, FormEventHandler } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router-dom';
import { Ticket, User } from '@acme/shared-models';

import newTicket from '../../../context/tickets/compose/create';
import Button from '../../components/Button';
import styles from './index.module.css';

interface RequestData {
  description: string;
}

const NewTicket = () => {
  const queryClient = useQueryClient();

  const addTicketMutation = useMutation({
    mutationFn: newTicket,
    onSettled: () => {
      queryClient.invalidateQueries(['tickets']);
    },
  });

  const onSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    // To be able to convert the FormData to a plain object
    // https://stackoverflow.com/a/71875866
    const formData = new FormData(event.currentTarget) as unknown as Iterable<
      [RequestData, FormDataEntryValue]
    >;
    const requestData: RequestData = Object.fromEntries(formData);
    console.log(requestData);
    addTicketMutation.mutate(requestData);
  };

  return (
    <div className={styles['container']}>
      <h2>New ticket</h2>

      <form onSubmit={onSubmitHandler}>
        <fieldset>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description" />
        </fieldset>
        <div className={styles['actions']}>
          <Button type="submit" disabled={addTicketMutation.isLoading}>
            Create ticket
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
