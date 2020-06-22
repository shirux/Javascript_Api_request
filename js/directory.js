class Directory {
    constructor() {
        this.amount = 12;
        this.language = 'us';
        this.endpoint = `https://randomuser.me/api/?results=${this.amount}&nat=${this.language}`;
        this.employees = [];
        this.currentModal = null;
    }

     init = async() => {
        const randomUsers = await getRandomUsers(this.endpoint);
        this.employees = randomUsers.map(item => {
            let employee = new Employee(item.name, item.email, item.location, item.cell, item.dob.date.substring(0,10), item.picture.medium);
            employee.printUser();
            return employee;
        });
        this.printModal();     

        const employeeDivs = document.querySelectorAll('.card');
        employeeDivs.forEach((div, index) => {
            div.addEventListener('click', e => {
                this.updateModal(index)
            })
        })
    }

    filterUsers = (filter) => {
        const users = document.querySelectorAll('#gallery .card');
        users.forEach(user => {
            const name = user.querySelector('#name').textContent.toLowerCase()
            if (name.includes(filter)) {
                user.style.display = 'inherit';
            } else {
                user.style.display = 'none';
            }
        });
    }

    printModal = () => {
        const modalContainer = createHTMLElement('div', {'class': 'modal-container'});
        modalContainer.style.display = 'none';
        modalContainer.appendChild(this.printModalInfo());
        modalContainer.appendChild(this.printModalButtons());
        document.body.appendChild(modalContainer);
        this.addCloseOption();
    } 

    printModalInfo = () => {
        const modal = createHTMLElement('div', {'class': 'modal'});
        
        const closeButton = createHTMLElement('button', {
            'id': 'modal-close-btn',
            'class': 'modal-close-btn'
        });
        closeButton.innerHTML = '<strong>X</strong>';
        modal.appendChild(closeButton);

        // Create modal info container and append every element to it
        const modalInfoContainer = createHTMLElement('div', {'class': 'modal-info-container'});

        const img = createHTMLElement('img', {
            'class': 'modal-img',
            'src': 'https://placehold.it/125x125',
            'alt': 'profile picture'
        });
        const h3Name = createHTMLElement('h3', {'class': 'modal-name cap'}, 'name');
        const email = createHTMLElement('p', {'class': 'modal-text'}, 'email');
        const city = createHTMLElement('p', {'class': 'modal-text cap'}, 'city');
        const cellphone = createHTMLElement('p', {'class': 'modal-text'}, '(555) 555-5555');
        const address = createHTMLElement('p', {'class': 'modal-text'}, '123 Portland Ave., Portland, OR 97204');
        const birthday = createHTMLElement('p', {'class': 'modal-text'}, 'Birthday: 10/21/2015');

        modalInfoContainer.appendChild(img)
        modalInfoContainer.appendChild(h3Name);
        modalInfoContainer.appendChild(email);
        modalInfoContainer.appendChild(city);
        modalInfoContainer.appendChild(createHTMLElement('hr'));
        modalInfoContainer.appendChild(cellphone);
        modalInfoContainer.appendChild(address);
        modalInfoContainer.appendChild(birthday);

        modal.appendChild(modalInfoContainer);
        return modal;
    }

    printModalButtons = () => {
        const buttonContainer = createHTMLElement('div', {'class': 'modal-btn-container'});
        
        const prevButton = createHTMLElement('button', {
            'id': 'modal-prev',
            'class': 'modal-prev btn'
        }, 'Prev');
        const nextButton = createHTMLElement('button', {
            'id': 'modal-next',
            'class': 'modal-next btn'
        }, 'Next');

        prevButton.addEventListener('click', () => {
            if(this.currentModal != null && this.currentModal > 0) {
                this.updateModal(this.currentModal - 1);
            }
        });
        nextButton.addEventListener('click', () => {
            if(this.currentModal != null && this.currentModal < (this.employees.length - 1)) {
                this.updateModal(this.currentModal + 1);
            }
        })

        buttonContainer.appendChild(prevButton);
        buttonContainer.appendChild(nextButton);
        return buttonContainer;
    }

    addCloseOption = () => {
        const closeModal = document.querySelector('#modal-close-btn');
        closeModal.addEventListener('click', () => {
            const modal = document.querySelector('.modal-container');
            modal.style.display = 'none';
        });
    }
   
    updateModal = index => {
        this.currentModal = index;
        console.log(this.currentModal);
        const employee = this.employees[index];
        this.changeMainInfo(employee);

        const modal = document.querySelector('.modal-container');
        modal.style.display = 'inherit';
    }


    changeMainInfo = employee => {
        const img = document.querySelector('.modal-img');
        img.src = employee.img;

        const name = document.querySelector('.modal-name');
        name.textContent = `${employee.firstName} ${employee.lastName}`;

        const info = document.querySelectorAll('.modal-text');
        info[0].textContent = employee.email;
        info[1].textContent = employee.address.city;
        info[2].textContent = employee.cell;
        info[3].textContent = `${employee.address.number} ${employee.address.street}, ${employee.address.city}, ${employee.address.state}`;
        info[4].textContent = `Birthday: ${employee.birthday}`;
    }
}