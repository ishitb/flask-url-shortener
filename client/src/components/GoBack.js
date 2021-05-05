import '../styles/GoBack.css';

const GoBack = ({ goBack, pageRef }) => {
    const getNodes = (element) => {
        let childrenElements = [
            ...new Set(element?.children),
        ];
        for (let i = 0; i < childrenElements.length; i++) {
            childrenElements = childrenElements.concat(
                getNodes(childrenElements[i])
            );
        }

        childrenElements = [...new Set(childrenElements)];

        return childrenElements;
    };

    const filterInputs = (nodes) => {
        let inputs = [];
        nodes.forEach((node) => {
            if (node.localName === 'input')
                inputs = [...inputs, node];
        });

        inputs = [...new Set(inputs)];

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    };

    return (
        <div
            className='go-back'
            onClick={() => {
                if (pageRef)
                    filterInputs(
                        getNodes(pageRef?.current)
                    );

                goBack();
            }}
        ></div>
    );
};

export default GoBack;
