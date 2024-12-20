
const Filters = ({ selectedCategory, setSelectedCategory }) => {
    const categories = ["Toate", "Bratari", "Cercei", "Coliere", "Inele"];

    return (
        <div className="tabsWrapper">
            {categories.map((category) => (
                <div
                    key={category}
                    className={`categoryTab ${selectedCategory === category || (category === "Toate" && selectedCategory === "") ? "selected" : ""}`}
                    onClick={() => setSelectedCategory(category === "Toate" ? "" : category)}
                >
                    {category}
                </div>
            ))}
        </div>
    );
};

export default Filters;
