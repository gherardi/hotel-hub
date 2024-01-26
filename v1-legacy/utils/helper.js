export const parseCookie = (str) =>
	str
		.split(';')
		.map((v) => v.split('='))
		.reduce((acc, v) => {
			acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
			return acc;
		}, {});

export function differenzaInGiorni(data1, data2) {
	// Converti le stringhe delle date in oggetti Date
	var dataInizio = new Date(data1);
	var dataFine = new Date(data2);

	// Calcola la differenza in millisecondi
	var differenzaMillisecondi = dataFine - dataInizio;

	// Converti la differenza in giorni
	var differenzaGiorni = differenzaMillisecondi / (1000 * 60 * 60 * 24);

	// Arrotonda il risultato e restituisci il valore assoluto
	return Math.abs(Math.round(differenzaGiorni));
}
