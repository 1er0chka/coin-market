import React, {FunctionComponent, MouseEventHandler} from 'react';
import styles from './Search.module.scss'

interface ISearchParams {
    onClick: MouseEventHandler<HTMLDivElement>
    searchInfo: string
    setSearchInfo: React.Dispatch<React.SetStateAction<string>>
}

const Search:FunctionComponent<ISearchParams> = ({onClick, searchInfo, setSearchInfo}) => {

    return (
        <div className={styles.input}>
            <input type={"text"} placeholder={"Search..."} value={searchInfo}
                   onChange={(event) => setSearchInfo(event.target.value)}/>
            <div onClick={onClick} className={styles.searchIcon}><img src={"resources/images/search.png"}/></div>
        </div>
    );
};

export default Search;