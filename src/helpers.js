export const setMoviesBy = (by, type) => {
    if(by === 'Top Rated' || by === 'top_rated') {
        return 'top_rated';
    } else if(by === 'Popular' || by === 'popular') {
        return 'popular';
    } else if((by === 'Upcoming' || by === 'upcoming') && type === 'tv') {
        return 'on_the_air';
    } else if (by === "Upcoming" || by === 'upcoming') {
        return 'upcoming';
    } else {
        return by;
    }
}