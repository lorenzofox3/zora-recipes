import zora from 'zora';
import multiply from './specs/multiply';
import square from './specs/square';

zora()
	.test(multiply)
	.test(square)
	.run();
