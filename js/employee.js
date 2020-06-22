class Employee {
    constructor(name, email, location, cell, birthday, img) {
        this.firstName = name.first;
        this.lastName = name.last;
        this.email = email;
        this.cell = cell;
        this.address = {
            number: location.street.number,
            street: location.street.name,
            city: location.city,
            state: location.state
        };
        this.birthday = birthday;
        this.img = img
        this.div = null;
    }

    /**
     * Prints the employee withing a card container
     */
    print = () => {
        this.div = createHTMLElement('div', {'class': 'card'});
        this.div.appendChild(this.appendImg());
        this.div.appendChild(this.appendInfo());
        gallery.appendChild(this.div);
    }

    /**
     * Create and returns an img div with the employee image
     */
    appendImg = () => {
        const divImg = createHTMLElement('div', {'class': 'card-img-container'});
        const img = createHTMLElement('img', {
            'class': 'card-img',
            'src': this.img,
            'alt': 'profile picture'
        });
        divImg.appendChild(img);
        return divImg;
    }
    
    /**
     * Create and returns a div with employee info
     */
    appendInfo = () => {
        const divInfo = createHTMLElement('div', {'class': 'card-info-container'});
        const h3 = createHTMLElement('h3', {
            'id': 'name',
            'class': 'card-name cap'
        }, `${this.firstName} ${this.lastName}`);
        const email = createHTMLElement('p', {'class': 'card-text'}, this.email);
        const location = createHTMLElement('p', {'class': 'card-text cap'}, `${this.address.city}, ${this.address.state}`);
        divInfo.appendChild(h3);
        divInfo.appendChild(email);
        divInfo.appendChild(location);
        return divInfo;
    } 
}