import axios from 'axios';
import PropTypes from 'prop-types';

export const queryPixabayAPI = async (query, page) => {
  const params = {
    q: query,
    page: page,
    key: '33211222-c5badd494422da90610699ad5',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: '12',
  };

  const { data } = await axios.get('https://pixabay.com/api/', { params });
  return data;
};

queryPixabayAPI.propTypes = {
  query: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
