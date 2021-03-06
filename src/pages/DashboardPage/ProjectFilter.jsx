const filterList = ['all', 'related', 'anime', 'game', 'architecture', 'nature', 'pets', 'people']

export default function ProjectFilter( {currentFilter, changeFilter} ) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

    return (
        <div className='project-filter'>
            <nav>
                <p>filter by:</p>
                {filterList.map((f) => (
                    <button
                     key={f}
                     onClick={()=>handleClick(f)}
                     className={currentFilter === f ? 'active, btn' : 'btn'}
                    >{f}</button>
                ))}
            </nav>
        </div>
    )
}
