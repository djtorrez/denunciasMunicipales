export interface Profile {
    msg?:  string;
    body?: Body;
}

export interface Body {
    name?:       string;
    lastname?:   string;
    age?:        number;
    profession?: string;
}
