import { useSelector } from 'react-redux';
import { getFilterValue } from 'redux/filterSlice';
import ContactListElement from '../ContactListElement/ContactListElement.jsx';
import { useFetchContactsQuery } from 'redux/contactsSlice';
import Loader from 'components/Loader/Loader.jsx';

export default function ContactList() {
  const { data, isFetching } = useFetchContactsQuery();

  const filter = useSelector(getFilterValue);

  const getVisibleContacts = () => {
    if (data) {
      return data.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  const visibleContacts = getVisibleContacts();

  return (
    <>
      {isFetching && <Loader />}
      {data && (
        <ul>
          {visibleContacts.length !== 0 ? (
            visibleContacts.map(item => (
              <ContactListElement key={item.id} item={item} />
            ))
          ) : (
            <li> Contact {filter} not found </li>
          )}
        </ul>
      )}
    </>
  );
}
