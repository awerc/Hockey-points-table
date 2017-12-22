matches = [
	{
        name: 'QUE',
        games: [
        	{
                enemy: 'PIT',
                game1: '6:3',
                game2: '3:5'
            },
            {
                enemy: 'CHI',
                game1: '4:0',
                game2: '2:4'
            },
            {
                enemy: 'MTL',
                game1: '3:0',
                game2: '3:2'
            },
            {
                enemy: 'DAL',
                game1: '2:0',
                game2: '3:2'
            }
        ]
    },
    {
        name: 'PIT',
        games: [
        	{
                enemy: 'QUE',
                game1: '3:6',
                game2: '5:3'
            },
            {
                enemy: 'CHI',
                game1: '2:1',
                game2: '5:1'
            },
            {
                enemy: 'MTL',
                game1: '3:4',
                game2: '5:1'
            },
            {
                enemy: 'DAL',
                game1: '4:1',
                game2: '5:2'
            }
        ]
    },
    {
        name: 'CHI',
        games: [
        	{
                enemy: 'QUE',
                game1: '0:4',
                game2: '4:2'
            },
            {
                enemy: 'PIT',
                game1: '1:2',
                game2: '1:5'
            },
            {
                enemy: 'MTL',
                game1: '1:0',
                game2: '0:1'
            },
            {
                enemy: 'DAL',
                game1: '1:2',
                game2: '0:1'
            }
        ]
    },
    {
        name: 'MTL',
        games: [
        	{
                enemy: 'QUE',
                game1: '0:3',
                game2: '2:3'
            },
            {
                enemy: 'PIT',
                game1: '4:3',
                game2: '1:5'
            },
            {
                enemy: 'CHI',
                game1: '0:1',
                game2: '1:0'
            },
            {
                enemy: 'DAL',
                game1: '2:1',
                game2: '2:3'
            }
        ]
    },
    {
        name: 'DAL',
        games: [
        	{
                enemy: 'QUE',
                game1: '0:2',
                game2: '2:3'
            },
            {
                enemy: 'PIT',
                game1: '1:4',
                game2: '2:5'
            },
            {
                enemy: 'CHI',
                game1: '2:1',
                game2: '1:0'
            },
            {
                enemy: 'MTL',
                game1: '1:2',
                game2: '2:3'
            }
        ]
    }
]

function createTd(text, className, ...attrs) {
	td = document.createElement('td');
	td.appendChild(document.createTextNode(text));
    if(className) td.className += className;
    attrs.forEach(x => td.setAttribute(x.name, x.value));
	return td;
}

function createTh(text, className, ...attrs) {
	th = document.createElement('th');
	th.appendChild(document.createTextNode(text));
    if(className) th.className += className;
    attrs.forEach(x => td.setAttribute(x.name, x.value));
	return th;
}

function createTr(className, ...children) {
    tr = document.createElement('tr');
    if(className) tr.className += className;
    children.forEach(x => tr.appendChild(x));
    return tr;
}

function createTable(teams) {
	let root = document.getElementById('root');
	let table = document.createElement('table');
	
	//Первая строка
    let numbers = [];
    for (let i = 1; i < teams.length+1; i++) {
            numbers.push(createTh(i));
    };

    let row = createTr('header-row', 
        createTh('№'),
        createTh('Команда'),
        ...numbers,
        createTh('И'),
        createTh('В'),
        createTh('Н'),
        createTh('П'),
        createTh('Ш'),
        createTh('О')
    )
	table.appendChild(row);

    //Строки с командами
	teams.forEach((team, current) => {
        let row1 = createTr('main-row', 
            createTd(current+1, '', {name: 'rowspan', value: '2'}),
            createTd(team.name, '', {name: 'rowspan', value: '2'})
        );
        let row2 = createTr('additional-row');
		let stats = { pld: 0,
			w: 0,
			t: 0,
			l: 0,
			goals: [0, 0],
			pts: 0 }
		for (let enemy = 0; enemy < teams.length; enemy++) {
			let scores = team.games.reduce((val, x) => x.enemy === teams[enemy].name ? [x.game1, x.game2] : val, [0,0])
			let games = [];
            scores.forEach(x => {
				if(x === 0) return;
				stats.pld++;
				games = x.split(':');
				if(games[0] > games[1]) stats.w++;
				else if(games[0] < games[1]) stats.l++;
				else stats.t++;
				stats.goals[0] += +games[0];				
				stats.goals[1] += +games[1];				
			})
             if(current === enemy) {
                row1.appendChild(createTd('', 'empty'));
                row2.appendChild(createTd('', 'empty'));
            } else {
                let game1 = scores[0].split(':')[0] > scores[0].split(':')[1];
                row1.appendChild(createTd(scores[0], `${game1 ? 'win' : ''}`));
                let game2 = scores[1].split(':')[0] > scores[1].split(':')[1];
                row2.appendChild(createTd(scores[1], `${game2 ? 'win' : ''}`));
            }
		}
		stats.pts += stats.w*3 + stats.t;
		
		row1.append(
            createTd(stats.pld, '', {name: 'rowspan', value: '2'}),
            createTd(stats.w, '', {name: 'rowspan', value: '2'}),
            createTd(stats.t, '', {name: 'rowspan', value: '2'}),
            createTd(stats.l, '', {name: 'rowspan', value: '2'}),
            createTd(stats.goals.join('-'), '', {name: 'rowspan', value: '2'}),
            createTd(stats.pts, '', {name: 'rowspan', value: '2'})
        );

		table.appendChild(row1);
		table.appendChild(row2);
	})
	root.appendChild(table);
}

createTable(matches);