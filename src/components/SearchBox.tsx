import React from 'react';
import {Form} from "react-bootstrap";


interface SearchBoxProps
{
    keyword: string;
    setKeyword: (str: string) => void;
};

export function SearchBar(props: SearchBoxProps)
{
    const handleChange = (e: any) => {
        const str: string = e.target.value;
        props.setKeyword(str);
    }

    return (
        <Form.Group controlId="search.ControlSearch">
            <Form.Control
                type="text"
                value={props.keyword}
                placeholder="Search for a location"
                onChange={handleChange}
            />
        </Form.Group>
    );
};
