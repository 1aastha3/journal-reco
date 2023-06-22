function StarRating({ rating, setRating, count, size }) {
  const [hover, setHover] = useState(null);

  return (
    <HStack spacing="2px">
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue}
              display="none"
            />
            <FaStar cursor="pointer" size={size || 20} transition="color 200ms" />
          </Box>
        );
      })}
    </HStack>
  );
}